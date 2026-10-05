'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { categories, type Project } from '@/app/data/work';

const ALL = 'all';

const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Filterable portfolio grid. The active filter lives in `?category=` so the
 * home-page links can deep-link into it and a filtered view can be shared.
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requested = searchParams.get('category');
  const active = categories.some((c) => c.id === requested) ? requested! : ALL;

  const visible =
    active === ALL ? projects : projects.filter((p) => p.categories.includes(active));

  const select = useCallback(
    (id: string) => {
      const query = id === ALL ? '' : `?category=${id}`;
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router],
  );

  const filters = [{ id: ALL, label: 'All' }, ...categories];

  // Cards stagger in on page load only; after that, filter switches use the
  // plain enter/exit with no delay.
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section className="min-h-svh bg-white px-gutter pt-30 md:pt-32 pb-24 md:pb-32">
        <div>
          {/* Filters — centred plain-text tabs that scroll sideways on small
              screens rather than wrapping into a ragged block. */}
          <div className="-mx-[max(1.5rem,9.2vw)] px-[max(1.5rem,9.2vw)] md:mx-0 md:px-0 overflow-x-auto scrollbar-none">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex w-max mx-auto gap-6 md:gap-8"
            >
              {filters.map((filter, i) => {
                const isActive = filter.id === active;
                return (
                  <motion.button
                    key={filter.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.05 }}
                    onClick={() => select(filter.id)}
                    aria-pressed={isActive}
                    className={`shrink-0 py-1 text-sm md:text-[15px] whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:underline underline-offset-4 ${
                      isActive ? 'text-black font-[500]' : 'text-black/35 hover:text-black/70'
                    }`}
                  >
                    {filter.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="mt-10 md:mt-12 grid lg:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <WorkCard
                  key={project.slug}
                  project={project}
                  delay={firstRender.current ? 0.3 + Math.min(i, 5) * 0.08 : 0}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="mt-10 md:mt-12 bg-black px-6 py-24 text-center">
              <p className="text-white font-[600] text-lg">Projects coming soon</p>
              <p className="mt-2 text-sm text-white/50">
                Nothing published under {labelFor(active)} yet — have a look at the rest of our work.
              </p>
              <button
                onClick={() => select(ALL)}
                className="mt-6 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/70 hover:border-white hover:text-white transition-colors duration-300"
              >
                Show all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}

/**
 * Black panel: title on the left, screenshot in the middle, summary on the
 * right. Lays out by its own width (container query) so it stacks the same way
 * whether the grid is one column or two. On hover (or keyboard focus) the panel
 * blurs and offers "Case study" and "View site" — only those buttons navigate.
 * Touch screens have no hover, so there a tap on the card toggles the overlay.
 */
function WorkCard({ project, delay }: { project: Project; delay: number }) {
  const cover = project.caseStudy?.cover;
  const thumb = cover ?? project.image;
  const href = `/work/${project.slug}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Close a tapped-open overlay when the next tap lands outside this card.
  useEffect(() => {
    if (!open) return;
    const close = (e: globalThis.PointerEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const toggle = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || (e.target as Element).closest('a')) return;
    setOpen((o) => !o);
  };

  // Buttons only take clicks while the overlay is showing, so invisible ones
  // never swallow a tap meant for the card.
  const action =
    'pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto group-data-[open]:pointer-events-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className="@container"
    >
      <div
        ref={cardRef}
        data-open={open || undefined}
        onPointerUp={toggle}
        className="group relative overflow-hidden bg-black"
      >
        <div className="flex flex-col gap-5 p-5 transition-[filter] duration-500 group-hover:blur-[6px] group-focus-within:blur-[6px] group-data-[open]:blur-[6px] @xl:grid @xl:aspect-[5/3] @xl:grid-cols-[1fr_44%_1fr] @xl:items-center @xl:gap-0 @xl:p-0">
          <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.06] @xl:col-start-2 @xl:row-start-1">
            {project.video ? (
              <video
                src={project.video}
                poster={thumb}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : thumb ? (
              <Image
                src={thumb}
                alt={`${project.title} ${cover ? 'platform' : 'website'}`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 44vw, 100vw"
                className={`object-cover ${cover ? 'object-center' : 'object-top'}`}
              />
            ) : null}
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[9px] uppercase tracking-[0.12em] text-black">
              {labelFor(project.categories[0])}
            </span>
          </div>

          <h2 className="text-center text-white font-[400] tracking-[-0.01em] text-2xl leading-tight @xl:col-start-1 @xl:row-start-1 @xl:px-[7%] @3xl:text-[1.75rem]">
            {project.title}
          </h2>

          <p className="text-xs leading-snug text-white/80 @xl:col-start-3 @xl:row-start-1 @xl:px-[7%] @xl:text-[11px]">
            {project.summary}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-data-[open]:opacity-100">
          <Link href={href} className={`${action} bg-white text-black hover:bg-white/85`}>
            Case study
            <span className="sr-only">: {project.title}</span>
          </Link>
          {!project.hideSiteLink && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${action} border border-white/40 text-white hover:border-white`}
            >
              View site
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden />
              <span className="sr-only">of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
