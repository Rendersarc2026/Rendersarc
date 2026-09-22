'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { faqs } from '@/app/data/work';

export function Faq() {
  // Single open row: a page of simultaneously expanded answers is a wall of text.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-white px-6 lg:px-12 pt-32 md:pt-40 pb-24 md:pb-32 min-h-screen flex items-center"
    >
      <div className="w-full grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-24">
        {/* Standing head. Sticks while the answers scroll past it. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[#00ea77]" />
            <span className="text-[#00995a] text-xs tracking-widest uppercase font-bold">FAQ</span>
          </div>

          <h1 className="text-black font-[500] tracking-[-0.02em] leading-[1.1] text-[clamp(2rem,3.6vw,3.25rem)]">
            We&apos;re often asked
          </h1>

          <p className="mt-6 text-sm md:text-base leading-relaxed text-black/55 max-w-[42ch]">
            Approaching a new design project can come with many questions. Here are the ones
            we&apos;re asked most, and our (hopefully) helpful answers to them.
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-black/55 max-w-[42ch]">
            If you have any other questions or need more information, feel free to{' '}
            <Link
              href="/contact"
              className="text-black underline underline-offset-4 decoration-black/25 hover:text-[#00995a] hover:decoration-[#00ea77] transition-colors"
            >
              reach out to us
            </Link>
            .
          </p>
        </motion.div>

        {/* Answers */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
                className="bg-[#f4f4f4] transition-colors duration-300 hover:bg-[#efefef]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-start justify-between gap-8 px-6 md:px-10 py-6 md:py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset"
                >
                  <span className="text-base md:text-lg font-[500] text-black tracking-[-0.01em]">
                    {faq.question}
                  </span>
                  <Plus
                    size={18}
                    aria-hidden
                    className={`shrink-0 mt-1 text-black/40 transition-transform duration-300 group-hover:text-black ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-10 pb-7 pr-12 text-sm md:text-base leading-relaxed text-black/60 max-w-[80ch]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
