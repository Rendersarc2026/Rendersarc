'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

/** Each item is its own route; the logo still scrolls home to the top. */
const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

type IndicatorRect = { left: number; width: number };

/** Every page mounts its own Navigation, so the underline's last position is
    kept here (outside the component) to let it slide from the previous link. */
let lastIndicator: IndicatorRect | null = null;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorFrom = useRef(lastIndicator);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[pathname];
      const next = el ? { left: el.offsetLeft, width: el.offsetWidth } : null;
      lastIndicator = next;
      setIndicator(next);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  /** Logo behaviour: scroll home when already there, otherwise route home. No
      hash either way, so the address bar stays clean. */
  const goHome = () => {
    setIsOpen(false);

    if (pathname !== '/') {
      router.push('/');
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        backgroundColor: (scrolled || isOpen) ? 'rgba(255,255,255,0.85)' : '#f7f7f7',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        backdropFilter: (scrolled || isOpen) ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-44">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={goHome}
            aria-label="Renders Arc — back to top"
            className="shrink-0 text-black uppercase font-bold text-[15px] md:text-[18px] tracking-[0.12em] transition-opacity hover:opacity-70"
          >
            Renders Arc
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="relative flex items-center gap-4 xl:gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Link
                    ref={(el) => { linkRefs.current[item.href] = el; }}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    style={{ color: isActive ? '#000000' : 'rgba(0,0,0,0.8)' }}
                    className="block text-xs xl:text-[13px] tracking-[0.06em] uppercase transition-colors relative py-2 font-[600] hover:text-black"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
            {indicator && (
              <motion.div
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] bg-black"
                initial={
                  indicatorFrom.current
                    ? { x: indicatorFrom.current.left, width: indicatorFrom.current.width }
                    : { x: indicator.left, width: indicator.width, scaleX: 0 }
                }
                animate={{ x: indicator.left, width: indicator.width, scaleX: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} style={{ color: '#000000' }} className="transition-opacity hover:opacity-60">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="px-6 py-6 space-y-5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  style={{ color: pathname === item.href ? '#000000' : 'rgba(0,0,0,0.6)' }}
                  className="block w-full text-left text-sm tracking-widest uppercase py-1 font-[600]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                style={{ border: '1px solid rgba(0,0,0,0.2)', color: '#000000' }}
                className="block w-full mt-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase font-[500] text-center"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
