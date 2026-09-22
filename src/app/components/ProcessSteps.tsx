'use client';

import { motion } from 'motion/react';
import { processSteps } from '@/app/data/work';

export function ProcessSteps() {
  return (
    <section id="process" className="bg-white px-6 lg:px-12 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto">
        {processSteps.map((step, i) => (
          <motion.article
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
            className="grid md:grid-cols-[6rem_1fr_16rem] gap-6 md:gap-12 py-12 md:py-16 border-t border-black/10 last:border-b"
          >
            <p className="text-sm font-[500] tracking-[0.1em] text-black/30">{step.number}</p>

            <div>
              <h2 className="text-black font-[700] tracking-[-0.01em] text-2xl md:text-[32px]">
                {step.title}
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-black/60 max-w-[52ch]">
                {step.description}
              </p>
            </div>

            <ul className="space-y-2 text-sm text-black/50 md:text-right">
              {step.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
