'use client';

import { Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/Logo-White.png';

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/renders-arc-a701ba3b0/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/rendersarc/' },
];

/** Real routes rather than scroll-by-id, so the links work from every page. */
const EXPLORE = [
  { href: '/#services', label: 'What we do' },
  { href: '/process', label: 'Process' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
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
        className="max-w-6xl mx-auto px-6 py-14 md:py-16"
      >
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
          {/* Brand */}
          <div>
            <Image
              src={Logo}
              alt="Renders Arc"
              width={150}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/45 max-w-[30ch]">
              Designing digital futures with innovation and precision.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 text-white/60 flex items-center justify-center transition-colors duration-300 hover:bg-white hover:border-white hover:text-black"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/35">Explore</h4>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/35">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>
                <a
                  href="mailto:rendersarcmail@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  rendersarcmail@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918129321539" className="hover:text-white transition-colors">
                  +91 81293 21539
                </a>
              </li>
              <li className="text-white/40 leading-relaxed max-w-[26ch]">
                G-48, 1st Cross Rd, Panampilly Nagar, Kochi, Kerala 682036
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/35">
            © {currentYear} Renders Arc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/35 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
