'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react';

/** Looping clip shown in the opening window. Drop a file in /public/videos and
    point this at it (a same-named .jpg is used as its poster); until then the
    window shows the gradient painted on its background. */
const HERO_VIDEO: string | null = null;

/**
 * Scroll-pinned intro. The section is several screens tall and its content
 * sticks to the viewport while scroll progress (0–1) drives four beats:
 *   1. "There is a space"
 *   2. "between"
 *   3. a window opens between "your imagination" and "and reality"
 *   4. the window grows to fill the screen and "RENDERS ARC" fades in
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const bounds = useRef({ top: 0, range: 1 });

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      bounds.current = { top: el.offsetTop, range: Math.max(1, el.offsetHeight - window.innerHeight) };
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Progress through the section, derived by hand rather than with
  // useScroll({ target }): Motion hands opacity to a native ScrollTimeline,
  // which spans the whole document, so the text beats drifted off cue. A
  // function transform keeps every property on this one JS-driven value.
  const { scrollY } = useScroll();
  const p = useTransform(scrollY, (y) => {
    const { top, range } = bounds.current;
    return Math.min(1, Math.max(0, (y - top) / range));
  });

  const firstOpacity = useTransform(p, [0, 0.1, 0.16], [1, 1, 0]);
  const firstY = useTransform(p, [0.1, 0.16], [0, -24]);

  const betweenOpacity = useTransform(p, [0.16, 0.22, 0.3, 0.36], [0, 1, 1, 0]);
  const betweenY = useTransform(p, [0.16, 0.22, 0.3, 0.36], [24, 0, 0, -24]);

  // Window: `open` widens it from a slit to its framed size, `fill` takes it
  // edge to edge. Framed size comes from --rx/--ry so it can differ by breakpoint.
  const open = useTransform(p, [0.36, 0.5], [0, 1]);
  const fill = useTransform(p, [0.58, 0.82], [0, 1]);
  const radius = useTransform(fill, [0, 1], [24, 0]);
  const clipPath = useMotionTemplate`inset(calc(var(--ry) * (1 - ${fill})) calc((50% - (50% - var(--rx)) * ${open}) * (1 - ${fill})) round ${radius}px)`;
  const mediaScale = useTransform(p, [0.36, 0.82], [1.15, 1]);

  const sideOpacity = useTransform(p, [0.38, 0.5, 0.58, 0.68], [0, 1, 1, 0]);
  const leftX = useTransform(p, [0.38, 0.5, 0.58, 0.68], [-40, 0, 0, -80]);
  const rightX = useTransform(leftX, (x) => -x);

  const brandOpacity = useTransform(p, [0.8, 0.9], [0, 1]);
  const brandScale = useTransform(p, [0.8, 0.95], [0.94, 1]);

  const word = 'text-white font-[400] tracking-[-0.01em] leading-[1.3] text-[clamp(1.25rem,2.2vw,2rem)] text-center';

  return (
    <section id="hero" ref={ref} className="relative h-[450svh] bg-black">
      <h1 className="sr-only">There is a space between your imagination and reality. Renders Arc.</h1>

      <div
        aria-hidden
        className="sticky top-0 h-svh overflow-hidden [--rx:12%] [--ry:38%] md:[--rx:33%] md:[--ry:39%]"
      >
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.div
            style={{ scale: mediaScale }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_18%,#e5441a_0,transparent_32%),radial-gradient(ellipse_at_25%_35%,#6b260d_0,transparent_55%),linear-gradient(172deg,#2e1206_0%,#7c2f0e_42%,#e8861a_68%,#ffb423_100%)]"
          >
            {HERO_VIDEO && (
              <video
                src={`${HERO_VIDEO}.mp4`}
                poster={`${HERO_VIDEO}.jpg`}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: firstOpacity, y: firstY }}
          className={`${word} absolute inset-x-0 top-1/2 -translate-y-1/2`}
        >
          There is a space
        </motion.p>

        <motion.p
          style={{ opacity: betweenOpacity, y: betweenY }}
          className={`${word} absolute inset-x-0 top-1/2 -translate-y-1/2`}
        >
          between
        </motion.p>

        {/* Below md the words sit above and below the window rather than beside it. */}
        <motion.p
          style={{ opacity: sideOpacity, x: leftX }}
          className={`${word} absolute inset-x-0 top-[22%] md:inset-x-auto md:top-1/2 md:left-0 md:w-[33%] md:-translate-y-1/2`}
        >
          your
          <br />
          imagination
        </motion.p>

        <motion.p
          style={{ opacity: sideOpacity, x: rightX }}
          className={`${word} absolute inset-x-0 bottom-[22%] md:inset-x-auto md:bottom-auto md:top-1/2 md:right-0 md:w-[33%] md:-translate-y-1/2`}
        >
          and
          <br />
          reality
        </motion.p>

        <motion.p
          style={{ opacity: brandOpacity, scale: brandScale }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white font-[400] tracking-[0.02em] text-[clamp(2rem,4.5vw,4rem)]"
        >
          RENDERS ARC
        </motion.p>
      </div>
    </section>
  );
}
