'use client';

import { useId, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/*
 * The 5 is one solid outline, measured from the brand mark: a flat bar, a
 * vertical stem with a flat foot, and a bowl (slightly wider than tall) whose
 * outer edge grows out of the stem and ends in a flat cut under TRUE.
 */
const BAR_W = 105;
const BAR_H = 23;
const STEM_W = 24;
const CX = 55;
const CY = 107;
const OUTER_RX = 59;
const OUTER_RY = 54.5;
const INNER_R = 32.5;
const FOOT_Y = 92; // flat foot of the stem
const TERMINAL_Y = 120; // flat top of the bowl's end

/** Left-hand x of an ellipse centred on the bowl at height y. */
const leftAt = (rx: number, ry: number, y: number) =>
  CX - rx * Math.sqrt(1 - ((y - CY) / ry) ** 2);
/** Height where the outer bowl meets the right edge of the stem. */
const SHOULDER_Y = CY - OUTER_RY * Math.sqrt(1 - ((CX - STEM_W) / OUTER_RX) ** 2);

const f = (n: number) => n.toFixed(2);
const FIVE = [
  `M 0 0 H ${BAR_W} V ${BAR_H} H ${STEM_W} V ${f(SHOULDER_Y)}`,
  `A ${OUTER_RX} ${OUTER_RY} 0 1 1 ${f(leftAt(OUTER_RX, OUTER_RY, TERMINAL_Y))} ${TERMINAL_Y}`,
  `H ${f(leftAt(INNER_R, INNER_R, TERMINAL_Y))}`,
  `A ${INNER_R} ${INNER_R} 0 1 0 ${f(leftAt(INNER_R, INNER_R, FOOT_Y))} ${FOOT_Y}`,
  `H 0 Z`,
].join(' ');

/**
 * Reveal mask. The 5 draws as one line: a wipe runs in from the bar's right tip
 * and down the stem, then a pie wedge carries on from the join round the bowl
 * and finishes at the tail under TRUE.
 * The bar and stem wipes stop exactly on the 5's own edges (y = BAR_H,
 * x = STEM_W) so neither uncovers a sliver of the bowl early. A circle of radius
 * SWEEP_R stroked at twice that width fills the whole disc as its pathLength
 * grows; it spans 355°, since an arc whose ends coincide draws nothing.
 */
const SWEEP_R = 32;
const onSweep = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${f(CX + SWEEP_R * Math.cos(a))} ${f(CY + SWEEP_R * Math.sin(a))}`;
};
const SWEEP = `M ${onSweep(-170)} A ${SWEEP_R} ${SWEEP_R} 0 1 1 ${onSweep(185)}`;

const DRAW_START = 0.8; // after TRUE has faded in
const BAR_T = 0.35;
const STEM_T = 0.3;
const BOWL_T = 0.8;

/**
 * Opening mark for /process: the True 5 wordmark. TRUE fades in letter by
 * letter, then the 5 draws in as one line (bar, stem, bowl) through a mask, and
 * the mark drifts back as the page scrolls into the section below.
 */
export function TrueFiveHero() {
  const reduce = useReducedMotion();
  const maskId = useId();
  // Once drawn, the 5 renders unmasked so no seam between the wipes can linger.
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative bg-white px-6 pt-20 min-h-[70svh] md:min-h-[80svh] flex items-center justify-center"
    >
      <motion.h1 aria-label="True 5" style={{ y, scale, opacity }} className="m-0 will-change-transform">
        {/* viewBox is symmetric about the 5 itself so the numeral, not TRUE, sits on centre. */}
        <svg
          aria-hidden
          viewBox="-16 0 144 163"
          className="block h-[clamp(11rem,22vw,19rem)] w-auto overflow-visible"
        >
          <mask id={maskId} maskUnits="userSpaceOnUse" x={-20} y={-10} width={145} height={185}>
            <motion.rect
              y={-2}
              height={BAR_H + 2}
              initial={reduce ? { x: -2, width: BAR_W + 4 } : { x: BAR_W + 2, width: 0 }}
              animate={{ x: -2, width: BAR_W + 4 }}
              transition={{ duration: BAR_T, ease: 'easeIn', delay: DRAW_START }}
              fill="white"
            />
            <motion.rect
              x={-2}
              y={-2}
              width={STEM_W + 2}
              initial={{ height: reduce ? FOOT_Y + 4 : 0 }}
              animate={{ height: FOOT_Y + 4 }}
              transition={{ duration: STEM_T, ease: 'linear', delay: DRAW_START + BAR_T }}
              fill="white"
            />
            <motion.path
              d={SWEEP}
              fill="none"
              stroke="white"
              strokeWidth={SWEEP_R * 2 + 2}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: BOWL_T, ease: 'easeOut', delay: DRAW_START + BAR_T + STEM_T }}
              onAnimationComplete={() => setDrawn(true)}
            />
          </mask>
          <path d={FIVE} mask={drawn || reduce ? undefined : `url(#${maskId})`} className="fill-black" />

          {/* Baseline sets TRUE's cap height midway between the stem foot and the bowl's end. */}
          <text
            x={-14}
            y={112}
            fontSize={17}
            fontWeight={700}
            letterSpacing={-0.2}
            className="fill-black"
            stroke="white"
            strokeWidth={5}
            strokeLinejoin="round"
            paintOrder="stroke"
          >
            {'TRUE'.split('').map((letter, i) => (
              <motion.tspan
                key={i}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 + i * 0.1 }}
              >
                {letter}
              </motion.tspan>
            ))}
          </text>
        </svg>
      </motion.h1>
    </section>
  );
}
