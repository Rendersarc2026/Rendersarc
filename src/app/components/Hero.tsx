'use client';

import { motion } from 'motion/react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center bg-white px-6 md:px-10 lg:px-16 xl:px-24 py-28"
    >
      {/* Headline — always two lines; the first line is under 17em wide, so 4.8vw
          keeps it inside the widest side padding (15vw at xl) at every width. */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-black font-[700] tracking-[-0.03em] leading-[1.12] text-[min(4.8vw,5rem)]"
      >
        <span className="block whitespace-nowrap">What if nothing stood between</span>
        <span className="block whitespace-nowrap">imagination and reality?</span>
      </motion.h1>
    </section>
  );
}
