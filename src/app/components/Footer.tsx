'use client';

import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Logo from '@/assets/Logo.png';
import GradientText from '@/components/GradientText';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
  ];

  return (
    <footer style={{ backgroundColor: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Massive brand name */}
      {/* <div className="overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 py-16"
        >
          <div className="flex flex-col items-center justify-center">
            <GradientText
              colors={["#00ea77", "#5227FF", "#FF9FFC", "#B19EEF", "#FF40A3", "#FF8C40", "#FFE47E"]}
              animationSpeed={8}
              showBorder={false}
              className="text-[2rem] md:text-[4rem] lg:text-[5rem] leading-none tracking-tight text-center font-bold mb-4 md:mb-8"
            >
              THE POWER TO MANIFEST
            </GradientText>
          </div>
        </motion.div>
      </div> */}

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="h-12 w-48 relative overflow-hidden flex items-center -ml-4">
                <Image
                  src={Logo}
                  alt="Renders Arc Logo"
                  fill
                  className="object-contain scale-[2.2] origin-center"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Designing digital futures with innovation and precision.
            </p>
            <div className="mt-6 h-px w-10" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Company
            </h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Work', 'Careers'].map((link) => (
                <li key={link}>
                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      if (link === 'About' || link === 'Services') {
                        const id = link.toLowerCase();
                        const element = document.getElementById(id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="text-sm transition-colors text-left"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Resources
            </h4>
            <ul className="space-y-3">
              {['Blog', 'Case Studies', 'Support', 'Privacy'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li>hello@rendersarc.com</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-4">
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                        style={{ border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'transparent' }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.backgroundColor = '#FFFFFF';
                          el.style.borderColor = '#FFFFFF';
                          const svg = el.querySelector('svg');
                          if (svg) (svg as SVGElement).style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.backgroundColor = 'transparent';
                          el.style.borderColor = 'rgba(255,255,255,0.15)';
                          const svg = el.querySelector('svg');
                          if (svg) (svg as SVGElement).style.color = 'rgba(255,255,255,0.6)';
                        }}
                      >
                        <Icon size={15} style={{ color: 'rgba(255,255,255,0.6)' }} />
                      </motion.a>
                    );
                  })}
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              © {currentYear} Renders Arc. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              {['Terms', 'Privacy', 'Cookies'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
