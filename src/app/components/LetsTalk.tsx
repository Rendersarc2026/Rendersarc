'use client';

import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Closing statement. `cta` adds the button through to the contact page — passed
 * on the home page, left off on /contact where the form is already below it.
 */
export function LetsTalk({ cta = false }: { cta?: boolean }) {
  return (
    <section id="contact" className="bg-white px-6 lg:px-12 py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-black font-[500] tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)]"
        >
          Let&apos;s talk.
        </motion.h2>

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-14 md:mt-20"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#fafafa] border border-black/10 hover:border-black rounded-full text-black transition-all duration-300 font-medium tracking-wide hover:shadow-[0_0_24px_rgba(0,0,0,0.08)]"
            >
              Start a project
              <MoveRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
