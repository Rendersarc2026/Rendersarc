import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="transition-opacity hover:opacity-60">
            <span style={{ color: '#FFFFFF' }} className="text-xl tracking-widest uppercase">
              Renders Arc
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                style={{ color: 'rgba(255,255,255,0.5)' }}
                className="text-sm tracking-widest uppercase transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ color: '#FFFFFF' } as any}
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection('contact')}
              style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF', backgroundColor: 'transparent' }}
              className="px-6 py-2.5 rounded-full text-sm tracking-widest uppercase transition-all hover:bg-white hover:text-black"
            >
              Get in touch
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} style={{ color: '#FFFFFF' }} className="transition-opacity hover:opacity-60">
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
            style={{ backgroundColor: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="px-6 py-6 space-y-5">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  className="block w-full text-left text-sm tracking-widest uppercase py-1"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}
                className="w-full mt-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase"
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
