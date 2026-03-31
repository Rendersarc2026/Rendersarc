'use client';

import Image from 'next/image';
import Logo from '@/assets/Logo.png';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy with IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'industries', 'contact'];
    const observers = new Map();

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id === 'hero' ? 'home' : id);
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(el);
        observers.set(id, observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
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
        backgroundColor: (scrolled || isOpen) ? '#000000' : 'transparent',
        borderBottom: (scrolled || isOpen) ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        backdropFilter: (scrolled || isOpen) ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center transition-opacity hover:opacity-80 shrink-0">
            <div className="h-12 w-48 relative overflow-hidden flex items-center">
              <Image
                src={Logo}
                alt="Renders Arc Logo"
                fill
                className="object-contain scale-[2.2] origin-center"
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {['Home', 'About', 'Services', 'Industries', 'Contact'].map((item, index) => {
              const itemKey = item.toLowerCase();
              const isActive = activeSection === itemKey;
              return (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item === 'Home' ? 'hero' : itemKey)}
                  style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}
                  className="text-sm tracking-widest uppercase transition-colors relative py-2 font-semibold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ color: '#FFFFFF' }}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-center"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection('contact')}
              style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}
              className="group relative overflow-hidden px-6 py-2.5 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:border-white font-semibold"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Get in touch</span>
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
              {['Home', 'About', 'Services', 'Industries', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  className="block w-full text-left text-sm tracking-widest uppercase py-1 font-semibold"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}
                className="w-full mt-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase font-semibold"
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
