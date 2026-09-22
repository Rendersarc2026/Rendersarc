'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { projects, type Project } from '@/app/data/work';
import { ProjectOverlay } from './ProjectOverlay';

const CARD_WIDTH = 240;
const CARD_GAP = 44;
/** How much the centred card outgrows the rest. */
const MAX_SCALE_BOOST = 0.3;
/** How far a resting card sinks below the focused one. */
const MAX_DROP = 14;
/** Per-frame approach rate of the lerp; lower is slower and softer. */
const EASE_RATE = 0.16;
/** Below this the lerp has visually arrived, so the loop can park itself. */
const SETTLE_EPSILON = 0.0005;

export function WhatWeBuild() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  // Focus amount actually painted for each card, kept between frames so the rail
  // eases towards its target instead of snapping to it on every scroll event.
  const focusRef = useRef(new WeakMap<HTMLElement, number>());
  const [selected, setSelected] = useState<Project | null>(null);
  // Which card the rail is parked on, mirrored into state only for the dots.
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));

  /** Focus a card *should* have right now: 1 dead centre, 0 a full pitch away. */
  const targetFocus = useCallback((card: HTMLElement, center: number) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    // Falls off over exactly one card pitch, so only the centred card grows
    // and neighbours keep their gaps instead of merging into one black mass.
    const distance = Math.min(Math.abs(center - cardCenter) / (CARD_WIDTH + CARD_GAP), 1);
    const linear = 1 - distance;
    // Smoothstep: flattens the curve at both ends so cards swell and settle
    // instead of ramping at a constant rate the eye reads as mechanical.
    return linear * linear * (3 - 2 * linear);
  }, []);

  const paint = useCallback((card: HTMLElement, focus: number) => {
    const scale = 1 + MAX_SCALE_BOOST * focus;
    const drop = MAX_DROP * (1 - focus);
    card.style.transform = `translate3d(0, ${drop.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    card.style.zIndex = String(Math.round(focus * 10));
  }, []);

  /** Index of whichever card sits nearest the middle of the rail right now. */
  const nearestIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;
    const midpoint = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    Array.from(scroller.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  }, []);

  /** One lerp step. Returns true while anything is still moving. */
  const step = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return false;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let moving = false;

    Array.from(scroller.children).forEach((child) => {
      const card = child as HTMLElement;
      const target = targetFocus(card, center);
      const current = focusRef.current.get(card) ?? target;
      const delta = target - current;
      const next = Math.abs(delta) < SETTLE_EPSILON ? target : current + delta * EASE_RATE;
      if (next !== current || Math.abs(delta) >= SETTLE_EPSILON) moving = true;
      focusRef.current.set(card, next);
      paint(card, next);
    });

    setActiveIndex(nearestIndex());

    return moving;
  }, [paint, targetFocus]);

  /** Runs the lerp until it settles; safe to call on every scroll event. */
  const run = useCallback(() => {
    if (frameRef.current !== null) return;
    const tick = () => {
      const moving = step();
      frameRef.current = moving ? requestAnimationFrame(tick) : null;
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [step]);

  /** Snaps every card straight to its target, skipping the ease. */
  const settle = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    Array.from(scroller.children).forEach((child) => {
      const card = child as HTMLElement;
      const focus = targetFocus(card, center);
      focusRef.current.set(card, focus);
      paint(card, focus);
    });
  }, [nearestIndex, paint, targetFocus]);

  /** Scrolls so `card` sits dead centre, without animating. */
  const center = useCallback((card: HTMLElement) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollLeft = card.offsetLeft + card.offsetWidth / 2 - scroller.clientWidth / 2;
  }, []);

  /** Glides card `index` to the middle — what the dots do when clicked. */
  const glideTo = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - scroller.clientWidth / 2,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Opens on a middle card so the rail reads as a coverflow, not a left-aligned
    // list. Deferred a frame: before layout every offsetLeft is still 0, which
    // would leave the rail at 0 and every card at the same size.
    const frame = requestAnimationFrame(() => {
      const middle = scroller.children[Math.floor(projects.length / 2)] as HTMLElement | undefined;
      if (middle) center(middle);
      settle();
    });

    // The rail's own width drives the maths, so watch the element rather than the
    // window — and keep whichever card was centred centred across the resize.
    const observer = new ResizeObserver(() => {
      const midpoint = scroller.scrollLeft + scroller.clientWidth / 2;
      const nearest = Array.from(scroller.children).reduce<HTMLElement | null>((best, child) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        if (!best) return card;
        const bestCenter = best.offsetLeft + best.offsetWidth / 2;
        return Math.abs(cardCenter - midpoint) < Math.abs(bestCenter - midpoint) ? card : best;
      }, null);
      if (nearest) center(nearest);
      // A resize is a jump, not a glide — ease from the new geometry, not the old.
      settle();
    });
    observer.observe(scroller);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [center, settle]);

  return (
    <section id="projects" className="bg-white px-6 lg:px-12 pb-24 md:pb-32">
      <div className="relative">
        {/* Backing panel. Its bottom edge sits below the resting cards so only the
            focused one overhangs; see the rail's pb-20 below. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-4 rounded-[2rem] bg-[#f4f4f4]"
        />

        <div className="relative pt-24 md:pt-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center text-black font-[300] tracking-[-0.02em] leading-[1.1] text-[clamp(2rem,5vw,4rem)]"
          >
            What we build,
            <br />
            specifically
          </motion.h2>

          <div
            ref={scrollerRef}
            onScroll={run}
            style={{
              paddingInline: `calc(50% - ${CARD_WIDTH / 2}px)`,
              gap: CARD_GAP,
            }}
            className="mt-14 md:mt-24 flex overflow-x-auto snap-x snap-mandatory scrollbar-none pt-12 pb-20"
          >
            {projects.map((project) => (
              <button
                key={project.slug}
                onClick={() => setSelected(project)}
                style={{ width: CARD_WIDTH }}
                className="group relative shrink-0 h-[260px] rounded-2xl bg-black overflow-hidden snap-center origin-center will-change-transform flex items-end justify-center pb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="240px"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
                <span className="relative z-10 px-4 text-center text-white text-sm font-[500]">
                  {project.title}
                </span>
              </button>
            ))}
          </div>

          {/* Position indicator: one dot per card, and a way to jump to any of
              them without dragging the rail. */}
          <div className="mt-6 pb-10 flex items-center justify-center gap-2.5">
            {projects.map((project, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={project.slug}
                  onClick={() => glideTo(i)}
                  aria-label={`Show ${project.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="p-1.5 -m-1.5 group focus:outline-none"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-6 bg-black'
                        : 'w-1.5 bg-black/20 group-hover:bg-black/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectOverlay project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
