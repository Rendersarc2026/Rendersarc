'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { storageUrl } from '@/app/lib/storage';

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_CLASS =
  'font-serif font-[600] tracking-[-0.01em] leading-[1.25] text-[clamp(1.75rem,3.35vw,3.5rem)]';
const INTRO_CLASS =
  'max-w-[47rem] text-center font-[400] leading-[1.35] text-[clamp(1.125rem,1.7vw,1.75rem)]';

/**
 * Maps `progress` from [from, to] onto [a, b], clamped. Computed in JS on
 * purpose: Motion hands plain opacity ranges to a browser scroll timeline,
 * which tracks the whole page instead of this section.
 */
function useRange(progress: MotionValue<number>, [from, to]: [number, number], [a, b]: [number, number]) {
  return useTransform(progress, (v) => {
    const t = Math.min(1, Math.max(0, (v - from) / (to - from)));
    return a + (b - a) * t;
  });
}

/**
 * One pinned screen that opens as the hero — video band over the headline,
 * split 375 : 431 as in the design, the band running up under the transparent
 * nav — and, as the page scrolls, hands over to the studio line centred on
 * white: the band slides up and away, the headline lifts and fades, then the
 * line fades in and holds before the page moves on.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const bandY = useRange(scrollYProgress, [0.08, 0.45], [0, -100]);
  const headlineY = useRange(scrollYProgress, [0.08, 0.4], [0, -80]);
  const headlineOpacity = useRange(scrollYProgress, [0.08, 0.35], [1, 0]);
  const introY = useRange(scrollYProgress, [0.4, 0.65], [40, 0]);
  const introOpacity = useRange(scrollYProgress, [0.4, 0.65], [0, 1]);
  const bandTransform = useTransform(bandY, (v) => `translateY(${v}%)`);

  const video = (
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
  );

  const headline = (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className={HEADLINE_CLASS}
    >
      We turn real user behaviour into
      <span className="block font-normal italic">better digital experiences.</span>
    </motion.h1>
  );

  const intro = (
    <p className={INTRO_CLASS}>
      Renders Arc is a strategy-led digital studio powered by True&nbsp;5, our tested
      methodology for understanding user psychology before design begins.
    </p>
  );

  // Without motion: the two screens simply stacked.
  if (reduce) {
    return (
      <>
        <section id="hero" className="h-svh min-h-[560px] flex flex-col bg-white text-black">
          <div data-nav-overlay className="relative min-h-0 basis-0 grow-[375] overflow-hidden bg-black">
            {video}
          </div>
          <div className="basis-0 grow-[431] flex flex-col justify-center">
            <div className="px-gutter py-10">{headline}</div>
          </div>
        </section>
        <section className="min-h-svh flex items-center justify-center bg-white text-black px-gutter py-24">
          {intro}
        </section>
      </>
    );
  }

  return (
    // Three screens tall: the scroll distance the hand-over plays across.
    <section ref={ref} id="hero" className="relative h-[300svh] bg-white text-black">
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden flex flex-col">
        <motion.div
          data-nav-overlay
          style={{ transform: bandTransform }}
          className="relative min-h-0 basis-0 grow-[375] overflow-hidden bg-black"
        >
          {video}
        </motion.div>

        {/* Padding sits on an inner box: on the flex item itself it would count
            toward its share and throw the split off. */}
        <div className="basis-0 grow-[431] flex flex-col justify-center">
          <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="px-gutter py-10">
            {headline}
          </motion.div>
        </div>

        <motion.div
          style={{ y: introY, opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-gutter"
        >
          {intro}
        </motion.div>
      </div>
    </section>
  );
}
