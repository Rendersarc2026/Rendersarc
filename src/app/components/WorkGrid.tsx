'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { categories, projects, type Project } from '@/app/data/work';

const ALL = 'all';

const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

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
      <section className="min-h-svh bg-white px-4 md:px-6 lg:px-7 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Filters — centred plain-text tabs that scroll sideways on small
              screens rather than wrapping into a ragged block. */}
          <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-none">
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
 * Black panel: title on the left, screenshot in the middle, summary and arrow
 * on the right. Lays out by its own width (container query) so it stacks the
 * same way whether the grid is one column or two.
 */
function WorkCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className="@container"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group flex flex-col gap-5 bg-black p-5 @xl:grid @xl:aspect-[5/3] @xl:grid-cols-[1fr_44%_1fr] @xl:items-center @xl:gap-0 @xl:p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.06] @xl:col-start-2 @xl:row-start-1">
          {project.image && (
            <Image
              src={project.image}
              alt={`${project.title} website`}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 44vw, 100vw"
              className="object-cover object-top"
            />
          )}
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[9px] uppercase tracking-[0.12em] text-black">
            {labelFor(project.categories[0])}
          </span>
        </div>

        <h2 className="text-white font-[400] tracking-[-0.01em] text-2xl leading-tight @xl:col-start-1 @xl:row-start-1 @xl:px-[7%] @3xl:text-[1.75rem]">
          {project.title}
        </h2>

        <p className="flex items-end gap-1.5 text-xs leading-snug text-white/80 @xl:col-start-3 @xl:row-start-1 @xl:px-[7%] @xl:text-[11px]">
          <span>{project.summary}</span>
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            aria-hidden
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </p>
      </Link>
    </motion.article>
  );
}
