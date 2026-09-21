'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';

/** `id` is the section element scrolled to; 'contact' is the footer for now. */
const NAV_ITEMS: { id: string | null; label: string }[] = [
  { id: 'services', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: null, label: 'Process' },
  { id: 'clients', label: 'Clients' },
  { id: null, label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(pathname === '/' ? 'hero' : '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highly robust ScrollSpy with a single IntersectionObserver
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['hero', 'services', 'projects', 'clients', 'testimonials', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const activeId = id;
            if (activeId) {
              setActiveSection(activeId);
            }
          }
        });
      },
      {
        // Focus detection on a narrow band near the top of the viewport
        // This ensures only one section wins as the "active" one
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    // Slight delay to allow layout to settle after state change
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height of the navbar
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150); // Shorter delay for better responsiveness
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: (scrolled || isOpen) ? 'rgba(255,255,255,0.85)' : '#f7f7f7',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        backdropFilter: (scrolled || isOpen) ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            aria-label="Renders Arc — back to top"
            className="shrink-0 text-black uppercase font-bold text-[15px] md:text-[18px] tracking-[0.12em] transition-opacity hover:opacity-70"
          >
            Renders Arc
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <motion.div className="flex items-center space-x-4 xl:space-x-6" layout>
            {NAV_ITEMS.map((item, index) => {
              const isActive = item.id !== null && activeSection === item.id;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => item.id && scrollToSection(item.id)}
                  aria-disabled={item.id === null || undefined}
                  style={{ color: isActive ? '#000000' : 'rgba(0,0,0,0.8)' }}
                  className="text-xs xl:text-[13px] tracking-[0.06em] uppercase transition-colors relative py-2 font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ color: '#000000' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black origin-center"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
            </motion.div>
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
                <button
                  key={item.label}
                  onClick={() => item.id && scrollToSection(item.id)}
                  aria-disabled={item.id === null || undefined}
                  style={{ color: 'rgba(0,0,0,0.6)' }}
                  className="block w-full text-left text-sm tracking-widest uppercase py-1 font-light"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                style={{ border: '1px solid rgba(0,0,0,0.2)', color: '#000000' }}
                className="w-full mt-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase font-light"
              >
                Get in touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
