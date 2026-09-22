'use client';

import { motion } from 'motion/react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-white px-6 lg:px-12 pt-32 md:pt-40 pb-10 md:pb-14"
    >
      {/* Headline */}
      <div className="flex-1 flex items-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-black font-[700] tracking-[-0.03em] leading-[1.12] text-[clamp(2rem,5.3vw,5rem)]"
        >
          We design around the five people
          <br className="hidden md:block" />{' '}
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
        </motion.h1>
      </div>

    </section>
  );
}
