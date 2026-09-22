'use client';

import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';

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
          className="text-black font-[500] tracking-[-0.03em] leading-[1.12] text-[clamp(2rem,5.3vw,5rem)]"
        >
          We design around the five people
          <br className="hidden md:block" />{' '}
          who&apos;ll actually use it.
          <MoveRight
            className="inline-block align-middle ml-[0.25em] mb-[0.12em] w-[0.72em] h-[0.72em]"
            strokeWidth={2.75}
            aria-hidden
          />
        </motion.h1>
      </div>

    </section>
  );
}
