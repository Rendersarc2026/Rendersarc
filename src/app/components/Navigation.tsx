'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Each item is its own route; the logo still scrolls home to the top. */
const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '/work', label: 'Work' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

type IndicatorRect = { left: number; width: number };

/** Every page mounts its own Navigation, so the underline's last position is
    kept here (outside the component) to let it slide from the previous link. */
let lastIndicator: IndicatorRect | null = null;

/** Whether the page at the bar is dark: takes the first element just below its
    bottom edge (pages pad their top by the bar's height, so the strip directly
    behind it is usually bare page background), then climbs to the nearest
    ancestor with a solid background. Falls back to light. */
function isDarkBehind(nav: HTMLElement) {
  const hit = document
    .elementsFromPoint(window.innerWidth / 2, nav.offsetHeight + 1)
    .find((el) => !nav.contains(el));

  for (let el = hit ?? null; el; el = el.parentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    const [a, b, c, alpha = 1] = (bg.match(/[\d.]+/g) ?? []).map(Number);
    if (a === undefined || alpha < 0.5) continue;
    // Tailwind v4 palette colours compute to oklch(); everything else to rgb().
    return bg.startsWith('oklch') ? a < 0.5 : 0.2126 * a + 0.7152 * b + 0.0722 * c < 128;
  }
  return false;
}

/** `dark`: whether the page opens on a dark section. Seeds the colour the bar
    is server-rendered with, so it doesn't flash light on load before the
    scroll check below can look at the page.
    `overlay`: the page opens with media running up under the bar (marked
    `data-nav-overlay`), so the bar stays see-through while that media is behind
    it, and only takes its solid look once scrolled past it (or the menu opens). */
export function Navigation({
  dark: startDark = false,
  overlay = false,
}: {
  dark?: boolean;
  overlay?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overMedia, setOverMedia] = useState(overlay);
  const [dark, setDark] = useState(startDark);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
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
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      if (!navRef.current) return;
      setDark(isDarkBehind(navRef.current));
      const media = overlay ? document.querySelector('[data-nav-overlay]') : null;
      setOverMedia(
        media !== null && media.getBoundingClientRect().bottom > navRef.current.offsetHeight,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname, overlay]);

  useEffect(() => setIsOpen(false), [pathname]);

  /** Logo behaviour: a real link home (so it prefetches and opens in a new
      tab), but scroll to the top instead when already on the home page. */
  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);

    if (pathname !== '/') return;

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // See-through while the opening media is behind the bar.
  const clear = overMedia && !isOpen;

  // Foreground colour as an "r,g,b" triple, flipped when the page behind is dark.
  const ink = dark ? '255,255,255' : '0,0,0';

  return (
    <nav
      ref={navRef}
      style={{
        backgroundColor: clear
          ? 'transparent'
          : dark
            ? (scrolled || isOpen) ? 'rgba(0,0,0,0.85)' : '#000000'
            : (scrolled || isOpen) ? 'rgba(255,255,255,0.85)' : '#f7f7f7',
        borderBottom: `1px solid rgba(${ink},${clear ? 0 : 0.06})`,
        backdropFilter: !clear && (scrolled || isOpen) ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="w-full px-gutter">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={goHome}
            aria-label="Renders Arc — home"
            style={{ color: `rgb(${ink})` }}
            className="shrink-0 uppercase font-bold text-[15px] md:text-[18px] tracking-[0.12em] transition-[color,opacity] duration-300 hover:opacity-70"
          >
            Renders Arc
          </Link>

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
                    style={{ color: `rgba(${ink},${isActive ? 1 : 0.8})` }}
                    className="block text-xs xl:text-[13px] tracking-[0.06em] uppercase transition-colors duration-300 relative py-2 font-[600]"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
            {indicator && (
              <motion.div
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] transition-colors duration-300"
                style={{ backgroundColor: `rgb(${ink})` }}
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
            <button onClick={() => setIsOpen(!isOpen)} style={{ color: `rgb(${ink})` }} className="transition-[color,opacity] duration-300 hover:opacity-60">
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
            style={{
              backgroundColor: dark ? '#000000' : '#ffffff',
              borderTop: `1px solid rgba(${ink},0.06)`,
            }}
          >
            <div className="px-6 py-6 space-y-5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  style={{ color: `rgba(${ink},${pathname === item.href ? 1 : 0.6})` }}
                  className="block w-full text-left text-sm tracking-widest uppercase py-1 font-[600]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                style={{ border: `1px solid rgba(${ink},0.2)`, color: `rgb(${ink})` }}
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
