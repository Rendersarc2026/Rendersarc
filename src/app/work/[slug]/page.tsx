import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navigation } from '../../components/Navigation';
import { LetsTalk } from '../../components/LetsTalk';
import { Footer } from '../../components/Footer';
import { caseStudyFor, projects } from '@/app/data/work';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case study — Renders Arc`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const study = caseStudyFor(project);
  const hero = study.cover ?? project.image;

  const sections = [
    { heading: 'The problem', body: study.problem },
    { heading: 'Our approach', body: study.approach },
  ];

  return (
    <div className="size-full bg-black relative overflow-x-clip">
      <Navigation dark />
      <main className="relative text-white">
        <article className="px-6 md:px-10 lg:px-16 xl:px-24 pt-32 md:pt-40 pb-24 md:pb-32">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
              All work
            </Link>

            <header className="mt-10 md:mt-14">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Case study</p>
              <h1 className="mt-6 font-[700] tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,7vw,6rem)]">
                {project.title}
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/60 max-w-[54ch]">
                {project.summary}
              </p>
              {!project.hideSiteLink && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 md:mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-white/85"
                >
                  Visit site
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </header>

            {hero && (
              <div
                className={`mt-12 md:mt-16 relative rounded-2xl overflow-hidden bg-white/[0.06] ${
                  study.cover ? 'aspect-video' : 'aspect-[16/10]'
                }`}
              >
                <Image
                  src={hero}
                  alt={`${project.title} ${study.cover ? 'platform' : 'website'}`}
                  fill
                  priority
                  sizes="(min-width: 1400px) 1400px, 100vw"
                  className={`object-cover ${study.cover ? 'object-center' : 'object-top'}`}
                />
              </div>
            )}

            <div className="mt-20 md:mt-32 space-y-16 md:space-y-24">
              {sections.map((section) => (
                <section
                  key={section.heading}
                  className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 md:gap-12"
                >
                  <h2 className="font-[700] tracking-[-0.01em] text-2xl md:text-[28px]">
                    {section.heading}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-[62ch]">
                    {section.body}
                  </p>
                </section>
              ))}

              {study.changes && (
                <section className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-8 md:gap-12">
                  <h2 className="font-[700] tracking-[-0.01em] text-2xl md:text-[28px]">
                    What we changed
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-12">
                    {study.changes.map((change) => (
                      <li key={change.title} className="border-t border-white/10 pt-5">
                        <h3 className="font-[600] text-lg">{change.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-white/60">{change.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 md:gap-12">
                <h2 className="font-[700] tracking-[-0.01em] text-2xl md:text-[28px]">The result</h2>
                <p className="text-xl md:text-[28px] leading-snug tracking-[-0.01em] text-white/60 max-w-[40ch]">
                  {study.result.text}
                  {study.result.emphasis && (
                    <>
                      {' '}
                      <strong className="font-[600] text-white">{study.result.emphasis}</strong>
                    </>
                  )}
                </p>
              </section>
            </div>

            {study.stats && (
              <section aria-label="Results" className="mt-20 md:mt-32 border-t border-white/10 pt-12">
                <ul className="grid sm:grid-cols-3 gap-10">
                  {study.stats.map((stat) => (
                    <li key={stat.label}>
                      <p className="font-[700] tracking-[-0.03em] text-5xl md:text-6xl">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm text-white/50">{stat.label}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Link
              href={`/work/${next.slug}`}
              className="group mt-20 md:mt-32 flex items-center justify-between gap-6 border-t border-white/10 pt-8"
            >
              <span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Next project
                </span>
                <span className="mt-3 block font-[700] tracking-[-0.02em] text-3xl md:text-5xl transition-opacity duration-300 group-hover:opacity-70">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                size={32}
                strokeWidth={1.5}
                aria-hidden
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </article>
        <LetsTalk cta />
      </main>
      <Footer />
    </div>
  );
}
