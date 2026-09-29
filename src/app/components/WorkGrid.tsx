'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { categories, projects, type Project } from '@/app/data/work';

const ALL = 'all';

const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

const countFor = (id: string) =>
  id === ALL ? projects.length : projects.filter((p) => p.categories.includes(id)).length;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Filterable portfolio grid. The active filter lives in `?category=` so the
 * home-page links can deep-link into it and a filtered view can be shared.
 */
export function WorkGrid() {
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
      <section className="min-h-svh bg-black px-6 md:px-10 lg:px-16 xl:px-24 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Filters — scroll sideways on small screens rather than wrapping into
              a ragged block above the grid. */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="-mx-6 px-6 md:mx-0 md:px-0 flex gap-2.5 overflow-x-auto scrollbar-none md:flex-wrap"
          >
            {filters.map((filter, i) => {
              const isActive = filter.id === active;
              return (
                <motion.button
                  key={filter.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.05 }}
                  onClick={() => select(filter.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive
                      ? 'bg-white border-white text-black'
                      : 'border-white/15 text-white/60 hover:border-white hover:text-white'
                  }`}
                >
                  {filter.label}
                  <span className={`text-[11px] tabular-nums ${isActive ? 'text-black/50' : 'text-white/35'}`}>
                    {countFor(filter.id)}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div layout className="mt-10 md:mt-14 grid md:grid-cols-2 gap-x-4 gap-y-12 md:gap-y-16">
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
            <div className="mt-10 md:mt-14 rounded-2xl bg-white/[0.06] px-6 py-24 text-center">
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

function WorkCard({ project, delay }: { project: Project; delay: number }) {
  const host = new URL(project.url).hostname.replace(/^www\./, '');
  const caseStudy = `/work/${project.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className="group"
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/[0.06]">
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} website`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-[scale,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:blur-md group-has-[:focus-visible]:scale-[1.06] group-has-[:focus-visible]:blur-md"
          />
        )}

        {/* The whole image opens the case study — this is what a tap does on
            touch screens, where the hover buttons never appear. Keyboard users
            reach the same page through the title, so it stays out of tab order. */}
        <Link href={caseStudy} tabIndex={-1} aria-hidden className="absolute inset-0" />

        {/* Hover (or keyboard focus) dims and blurs the shot and brings up both
            actions. Tailwind's hover variant only applies on hover-capable
            devices, so touch never gets stuck in this state. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group-hover:pointer-events-auto inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-[500] text-black transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black group-hover:translate-y-0 group-has-[:focus-visible]:translate-y-0"
          >
            Visit site
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
          </a>
          <Link
            href={caseStudy}
            className="group-hover:pointer-events-auto inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/70 bg-black/20 px-5 py-2.5 text-sm font-[500] text-white backdrop-blur transition-[translate,background-color] delay-75 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black group-hover:translate-y-0 group-has-[:focus-visible]:translate-y-0"
          >
            View case study
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <span className="pointer-events-none absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] uppercase tracking-[0.12em] text-black">
          {labelFor(project.categories[0])}
        </span>
      </div>

      <div className="mt-5 min-w-0">
        <h2 className="text-white font-[700] tracking-[-0.01em] text-xl md:text-2xl">
          <Link
            href={caseStudy}
            className="transition-opacity duration-300 hover:opacity-70 focus:outline-none focus-visible:underline"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/55 max-w-[46ch]">
          {project.summary}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs text-white/35 hover:text-white/70 transition-colors duration-300"
        >
          {host}
        </a>
      </div>
    </motion.article>
  );
}
