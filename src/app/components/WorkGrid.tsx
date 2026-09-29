'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { categories, projects, type Project } from '@/app/data/work';

const ALL = 'all';

const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

const countFor = (id: string) =>
  id === ALL ? projects.length : projects.filter((p) => p.categories.includes(id)).length;

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
    <section className="min-h-svh bg-black px-6 md:px-10 lg:px-16 xl:px-24 pt-32 md:pt-40 pb-24 md:pb-32">
      {/* One fade-up for the whole grid on load; filter changes don't replay it. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-[1400px] mx-auto"
      >
        {/* Filters — scroll sideways on small screens rather than wrapping into
          a ragged block above the grid. */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-6 px-6 md:mx-0 md:px-0 flex gap-2.5 overflow-x-auto scrollbar-none md:flex-wrap"
        >
          {filters.map((filter) => {
            const isActive = filter.id === active;
            return (
              <button
                key={filter.id}
                onClick={() => select(filter.id)}
                aria-pressed={isActive}
                className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isActive
                    ? 'bg-white border-white text-black'
                    : 'border-white/15 text-white/60 hover:border-white hover:text-white'
                }`}
              >
                {filter.label}
                <span
                  className={`text-[11px] tabular-nums ${isActive ? 'text-black/50' : 'text-white/35'}`}
                >
                  {countFor(filter.id)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-x-4 gap-y-12 md:gap-y-16">
          {visible.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="mt-10 md:mt-14 rounded-2xl bg-white/[0.06] px-6 py-24 text-center">
            <p className="text-white font-[600] text-lg">Projects coming soon</p>
            <p className="mt-2 text-sm text-white/50">
              Nothing published under {labelFor(active)} yet — have a look at the rest of our
              work.
            </p>
            <button
              onClick={() => select(ALL)}
              className="mt-6 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/70 hover:border-white hover:text-white transition-colors duration-300"
            >
              Show all projects
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  const host = new URL(project.url).hostname.replace(/^www\./, '');

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus:outline-none"
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/[0.06] group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-black"
      >
        {project.image && (
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={`${project.title} website`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] uppercase tracking-[0.12em] text-black">
          {labelFor(project.categories[0])}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-white font-[700] tracking-[-0.01em] text-xl md:text-2xl">
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55 max-w-[46ch]">
            {project.summary}
          </p>
          <p className="mt-3 text-xs text-white/35">{host}</p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-xs font-[500] text-white/70 transition-colors duration-300 group-hover:bg-white group-hover:border-white group-hover:text-black">
          Visit site
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
        </span>
      </div>
    </a>
  );
}
