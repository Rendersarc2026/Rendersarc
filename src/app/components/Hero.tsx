'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';
import { storageUrl } from '@/app/lib/storage';

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
      className="relative isolate overflow-hidden min-h-svh flex flex-col justify-center bg-black text-white px-gutter pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <video
        src={storageUrl('videos/hero.mp4')}
        poster={storageUrl('videos/hero.jpg')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      />
      {/* Keeps the copy legible over the brightest frames. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/45" />

      <motion.h1
        {...fadeUp(0)}
        className="max-w-[30ch] font-[500] tracking-[-0.02em] leading-[1.15] text-[clamp(1.75rem,3.6vw,3.5rem)]"
      >
        Renders Arc is a strategy-led digital studio powered by True&nbsp;5, our tested methodology
        for understanding user psychology before design begins.{' '}
        <span className="text-white/55">
          We turn real user behaviour into better digital experiences.
        </span>
      </motion.h1>

      <motion.div
        {...fadeUp(0.15)}
        className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:flex-wrap gap-3"
      >
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
      </motion.div>

    </section>
  );
}
