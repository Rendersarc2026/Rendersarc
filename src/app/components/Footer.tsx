'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react';

const EMAIL = 'rendersarcmail@gmail.com';

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/renders-arc-a701ba3b0/', Icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/rendersarc/', Icon: Instagram },
];

const PHONE = { label: '+91 81293 21539', href: 'tel:+918129321539' };

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
              className="mt-3 inline-flex items-center gap-3 sm:gap-4 text-xl sm:text-3xl font-semibold tracking-tight transition-opacity duration-300 hover:opacity-50"
            >
              <Mail strokeWidth={1.75} aria-hidden className="size-5 sm:size-7 shrink-0" />
              {EMAIL}
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-full border border-white/15 transition-colors duration-300 hover:border-white hover:text-white"
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden />
                </a>
              </li>
            ))}
            <li>
              <a
                href={PHONE.href}
                className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
              >
                <Phone size={16} strokeWidth={1.75} aria-hidden />
                {PHONE.label}
              </a>
            </li>
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
