'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const EMAIL = 'rendersarcmail@gmail.com';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/renders-arc-a701ba3b0/' },
  { label: 'Instagram', href: 'https://www.instagram.com/rendersarc/' },
  { label: '+91 81293 21539', href: 'tel:+918129321539' },
];

const LEGAL = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-gutter pt-20 pb-8 md:pt-24"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs text-white/40">Get in touch</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 block text-xl sm:text-3xl font-semibold tracking-tight transition-opacity duration-300 hover:opacity-50"
            >
              {EMAIL}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Renders Arc</p>
          <p>G-48, 1st Cross Rd, Panampilly Nagar, Kochi, Kerala 682036</p>
          <nav className="flex gap-6" aria-label="Legal">
            {LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </footer>
  );
}
