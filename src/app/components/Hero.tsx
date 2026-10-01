'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** One-off entrance on load, staggered by `delay`. */
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  };
}

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh flex flex-col justify-center bg-black text-white px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-44 pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <motion.h1
        {...fadeUp(0)}
        className="max-w-[16ch] font-[500] tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6rem)]"
      >
        There is a space between your imagination and reality.
      </motion.h1>

      <motion.div
        {...fadeUp(0.15)}
        className="mt-10 md:mt-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <p className="max-w-[46ch] text-base md:text-lg leading-relaxed text-white/60">
          We craft purposeful digital experiences — from strategy and branding to web design and
          marketing — built to elevate your business.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 lg:shrink-0">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 text-[15px] sm:text-base rounded-full bg-white text-black font-medium tracking-wide transition-colors duration-300 hover:bg-white/85"
          >
            Start a project
            <MoveRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center px-5 sm:px-7 py-3.5 text-[15px] sm:text-base rounded-full border border-white/20 text-white font-medium tracking-wide transition-colors duration-300 hover:border-white"
          >
            See our work
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
