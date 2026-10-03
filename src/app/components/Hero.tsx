'use client';

import { motion } from 'motion/react';
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
    // Below the 80px bar the screen splits 495 : 295 between the video band and
    // the copy, as in the design. The copy's share grows if its text needs more
    // room (small phones).
    <section id="hero" className="h-svh min-h-[560px] pt-20 flex flex-col bg-white text-black">
      <div className="relative min-h-0 basis-0 grow-[495] overflow-hidden bg-black">
        <video
          src={storageUrl('videos/hero.mp4')}
          poster={storageUrl('videos/hero.jpg')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="basis-0 grow-[295] px-gutter pt-[clamp(1.5rem,3.7vw,3.5rem)] pb-8">
        <motion.h1
          {...fadeUp(0.1)}
          className="max-w-[60ch] font-[400] tracking-[-0.01em] leading-[1.5] text-[clamp(1.125rem,2.1vw,2.25rem)]"
        >
          Renders Arc is a strategy-led digital studio powered by True&nbsp;5, our tested
          methodology for understanding user psychology before design begins.
          <span className="block">We turn real behaviour into better digital experiences.</span>
        </motion.h1>
      </div>
    </section>
  );
}
