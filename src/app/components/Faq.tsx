'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { faqs } from '@/app/data/work';

export function Faq() {
  // Single open row: a page of simultaneously expanded answers is a wall of text.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-6 lg:px-12 pb-24 md:pb-32">
      <div className="max-w-[900px] mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
              className="border-t border-black/10 last:border-b"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group w-full flex items-start justify-between gap-8 py-7 text-left"
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
                    <p className="pb-8 pr-10 text-sm md:text-base leading-relaxed text-black/60 max-w-[62ch]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
