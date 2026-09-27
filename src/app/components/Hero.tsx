'use client';

import { motion } from 'motion/react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center bg-white px-6 md:px-10 lg:px-16 xl:px-24 py-28"
    >
      {/* Headline — always two lines; the first line is ~17em wide, so 4.8vw
          keeps it inside the widest side padding (15vw at xl) at every width. */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-black font-[700] tracking-[-0.03em] leading-[1.12] text-[min(4.8vw,5rem)]"
      >
        <span className="block whitespace-nowrap">We design around the five people</span>
        <span className="block whitespace-nowrap">
          who&apos;ll actually use it.
          {/* Drawn rather than an icon-font glyph: lucide's arrow rounds its
              caps and joins, and this headline wants mitred, solid edges. */}
          <svg
            viewBox="0 0 24 16"
            fill="currentColor"
            shapeRendering="geometricPrecision"
            aria-hidden
            className="inline-block align-middle ml-[0.28em] mb-[0.08em] w-[0.78em] h-[0.52em]"
          >
            <path d="M0 6.1h14.4V1.4L24 8l-9.6 6.6V9.9H0z" />
          </svg>
        </span>
      </motion.h1>
    </section>
  );
}
