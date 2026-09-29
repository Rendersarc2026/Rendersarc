'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { categories, projects, type Project } from '@/app/data/work';

const ALL = 'all';

const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

const countFor = (id: string) =>
  id === ALL ? projects.length : projects.filter((p) => p.categories.includes(id)).length;

const EASE = [0.22, 1, 0.36, 1] as const;

// Cards rise in as they enter the viewport; the image wipes up inside the card
// while settling from a slight zoom, so the reveal reads as one motion.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: (column: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: column * 0.12 },
  }),
};

const frameVariants: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0% round 16px)' },
  shown: (column: number) => ({
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    transition: { duration: 1, ease: EASE, delay: column * 0.12 + 0.05 },
  }),
};

const imageVariants: Variants = {
  hidden: { scale: 1.15 },
  shown: (column: number) => ({
    scale: 1,
    transition: { duration: 1.4, ease: EASE, delay: column * 0.12 + 0.05 },
  }),
};

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

  const visible = active === ALL ? projects : projects.filter((p) => p.categories.includes(active));

  const select = useCallback(
    (id: string) => {
      const query = id === ALL ? '' : `?category=${id}`;
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router],
  );

  const filters = [{ id: ALL, label: 'All' }, ...categories];

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-white px-6 md:px-10 lg:px-16 xl:px-24 pt-32 md:pt-40 pb-24 md:pb-32">
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
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: 0.1 + i * 0.05,
                  }}
                  onClick={() => select(filter.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-black border-black text-white'
                      : 'border-black/10 text-black/60 hover:border-black hover:text-black'
                  }`}
                >
                  {filter.label}
                  <span
                    className={`text-[11px] tabular-nums ${isActive ? 'text-white/60' : 'text-black/35'}`}
                  >
                    {countFor(filter.id)}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            layout
            className="mt-10 md:mt-14 grid md:grid-cols-2 gap-x-4 gap-y-12 md:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <WorkCard key={project.slug} project={project} column={i % 2} />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="mt-10 md:mt-14 rounded-2xl bg-[#f4f4f4] px-6 py-24 text-center">
              <p className="text-black font-[600] text-lg">Projects coming soon</p>
              <p className="mt-2 text-sm text-black/50">
                Nothing published under {labelFor(active)} yet — have a look at the rest of our
                work.
              </p>
              <button
                onClick={() => select(ALL)}
                className="mt-6 px-5 py-2.5 rounded-full border border-black/10 text-sm text-black/70 hover:border-black hover:text-black transition-colors duration-300"
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

function WorkCard({ project, column }: { project: Project; column: number }) {
  const host = new URL(project.url).hostname.replace(/^www\./, '');
  // Reduced motion keeps the fade but drops the wipe and zoom.
  const reduce = useReducedMotion();

  return (
    <motion.a
      layout
      variants={cardVariants}
      custom={column}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      exit={{
        opacity: 0,
        scale: 0.97,
        transition: { duration: 0.45, ease: EASE },
      }}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus:outline-none"
    >
      <motion.div
        variants={reduce ? undefined : frameVariants}
        custom={column}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black group-focus-visible:ring-2 group-focus-visible:ring-black group-focus-visible:ring-offset-4"
      >
        {project.image && (
          <motion.div
            variants={reduce ? undefined : imageVariants}
            custom={column}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={`${project.title} website`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </motion.div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] uppercase tracking-[0.12em] text-black">
          {labelFor(project.categories[0])}
        </span>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-black font-[700] tracking-[-0.01em] text-xl md:text-2xl">
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-black/55 max-w-[46ch]">
            {project.summary}
          </p>
          <p className="mt-3 text-xs text-black/35">{host}</p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 text-xs font-[500] text-black/70 transition-colors duration-300 group-hover:bg-black group-hover:border-black group-hover:text-white">
          Visit site
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
        </span>
      </div>
    </motion.a>
  );
}
