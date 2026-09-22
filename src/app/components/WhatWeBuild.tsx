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
const EDGE_FADE =
  'linear-gradient(to right, transparent 0, #000 3rem, #000 calc(100% - 3rem), transparent 100%)';

export function WhatWeBuild() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  // Cards grow as they approach the middle of the rail.
  const applyFocus = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    Array.from(scroller.children).forEach((child) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      // Falls off over exactly one card pitch, so only the centred card grows
      // and neighbours keep their gaps instead of merging into one black mass.
      const distance = Math.min(Math.abs(center - cardCenter) / (CARD_WIDTH + CARD_GAP), 1);
      const scale = 1 + MAX_SCALE_BOOST * (1 - distance);
      card.style.transform = `scale(${scale.toFixed(3)})`;
      card.style.zIndex = String(Math.round((1 - distance) * 10));
    });
  }, []);

  const scheduleFocus = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      applyFocus();
    });
  }, [applyFocus]);

  /** Scrolls so `card` sits dead centre, without animating. */
  const center = useCallback((card: HTMLElement) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollLeft = card.offsetLeft + card.offsetWidth / 2 - scroller.clientWidth / 2;
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
      applyFocus();
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
      applyFocus();
    });
    observer.observe(scroller);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [applyFocus, center]);

  return (
    <section id="projects" className="bg-white px-6 lg:px-12 pb-24 md:pb-32">
      <div className="relative">
        {/* Backing panel. Its bottom edge sits below the resting cards so only the
            focused one overhangs; see the rail's pb-14 below. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-10 rounded-[2rem] bg-[#f4f4f4]"
        />

        <div className="relative pt-16 md:pt-24">
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
            onScroll={scheduleFocus}
            style={{
              paddingInline: `calc(50% - ${CARD_WIDTH / 2}px)`,
              gap: CARD_GAP,
              // Cards leaving the rail fade into the panel instead of being sliced
              // off at its rounded corners.
              maskImage: EDGE_FADE,
              WebkitMaskImage: EDGE_FADE,
            }}
            className="mt-12 md:mt-20 flex overflow-x-auto snap-x snap-mandatory scrollbar-none pt-12 pb-14"
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
