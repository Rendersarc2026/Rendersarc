// No 'use client' directive: this renders only inside WhatWeBuild, which is
// already a client component. Marking it an entry point makes Next treat
// `onClose` as a prop crossing the server boundary and demand a Server Action.
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { projects, type Project } from '@/app/data/work';

export function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [active, setActive] = useState<Project>(project);
  const tabsRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => setActive(project), [project]);

  // Freeze the page behind the overlay (Lenis drives the window scroll, so it
  // needs stopping as well as the usual body lock).
  useEffect(() => {
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [lenis, onClose]);

  // The rail is wider than the viewport once every project is listed, so keep
  // whichever one is open in sight — including the card clicked to get here.
  useEffect(() => {
    tabsRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [active.slug]);

  const siblings = projects.filter(
    (p) => p.category === active.category && p.slug !== active.slug
  );

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={active.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto overscroll-contain"
    >
      {/* Project tabs — every card in the rail, so the whole set is reachable
          without closing the overlay. */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center gap-6 px-6 lg:px-12 h-16">
          <nav
            ref={tabsRef}
            aria-label="Projects"
            className="flex-1 flex items-center justify-start lg:justify-between gap-7 lg:gap-6 overflow-x-auto scrollbar-none"
          >
            {projects.map((item) => {
              const isActive = item.slug === active.slug;
              return (
                <button
                  key={item.slug}
                  onClick={() => setActive(item)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`whitespace-nowrap text-sm font-[500] pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'text-black border-black'
                      : 'text-black/50 border-transparent hover:text-black'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </nav>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-black hover:border-black/30 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <motion.div
        key={active.slug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="grid lg:grid-cols-2"
      >
        {/* Imagery slot */}
        <div className="relative bg-black min-h-[45vh] lg:min-h-[calc(100vh-4rem)]">
          {active.image && (
            <Image
              src={active.image}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        {/* One measure for the whole column: heading, copy, rule and chips share
            a left and right edge instead of each ending where its text runs out. */}
        <div className="px-6 lg:px-16 py-14 lg:pt-[18vh] lg:pb-16 flex flex-col w-full max-w-[34rem] lg:mx-auto">
          <h2 className="text-black font-[700] uppercase tracking-[-0.01em] leading-[1.15] text-[clamp(1.5rem,2.6vw,2.25rem)]">
            {active.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black/70">
            {active.summary}
          </p>

          <div className="mt-16 lg:mt-auto lg:pt-24">
            <h3 className="text-black font-[700] text-xl md:text-2xl tracking-[-0.01em]">
              The approach
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              {active.approach}
            </p>
          </div>

          {siblings.length > 0 && (
            <div className="mt-14 pt-8 border-t border-black/5">
              <p className="text-xs uppercase tracking-[0.15em] text-black/40 mb-4">
                More in this category
              </p>
              <div className="flex flex-wrap gap-2">
                {siblings.map((sibling) => (
                  <button
                    key={sibling.slug}
                    onClick={() => setActive(sibling)}
                    className="px-4 py-2 rounded-full text-xs tracking-wide bg-black/5 text-black/60 hover:text-black hover:bg-black/10 transition-colors"
                  >
                    {sibling.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
