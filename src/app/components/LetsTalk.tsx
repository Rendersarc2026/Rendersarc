'use client';

import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/renders-arc-a701ba3b0/' },
  { label: 'Instagram', href: 'https://www.instagram.com/rendersarc/' },
  { label: 'Email', href: 'mailto:rendersarcmail@gmail.com' },
];

export function LetsTalk() {
  return (
    <section id="contact" className="bg-white px-6 lg:px-12 py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-black font-bold tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)]"
        >
          Let&apos;s talk.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-20 md:mt-32 flex flex-wrap items-center gap-x-12 md:gap-x-20 gap-y-5"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group inline-flex items-center gap-2 text-sm font-[500] text-black hover:opacity-60 transition-opacity"
            >
              {link.label}
              <MoveRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
