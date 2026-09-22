'use client';

import { motion } from 'motion/react';
import { pillars } from '@/app/data/work';

export function WhatWeDo() {
  return (
    <section id="services" className="bg-white pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-black font-[600] uppercase tracking-[-0.02em] leading-none text-[clamp(2.5rem,6vw,5rem)]"
        >
          What we do
        </motion.h2>
      </div>

      <div className="mt-20 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-2 px-6 lg:px-0">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <div className="pb-5 md:px-6">
              <h3 className="text-xl md:text-2xl font-[500] text-black tracking-[-0.01em]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-snug text-black/60 max-w-[36ch]">
                {pillar.description}
              </p>
            </div>

            {/* Imagery slot — swap the background for a project still once assets exist */}
            <div className="bg-[#f4f4f4] min-h-[320px] md:min-h-[460px] flex flex-col justify-end p-6 md:p-8">
              <ul className="space-y-1 text-sm text-black/70">
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
