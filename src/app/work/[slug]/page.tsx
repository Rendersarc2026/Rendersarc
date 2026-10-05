import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navigation } from '../../components/Navigation';
import { LetsTalk } from '../../components/LetsTalk';
import { Footer } from '../../components/Footer';
import { caseStudyFor, categories } from '@/app/data/work';
import { getProjects } from '@/app/data/projects';
import { Gallery } from './Gallery';

type Params = { slug: string };

const GALLERY_SLOTS = 3;
const PHONE_GALLERY_SLOTS = 5;

// Projects come from the database: re-read at most every five minutes, and
// slugs added after the build render on first visit.
export const revalidate = 300;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case study — Renders Arc`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const study = caseStudyFor(project);
  const hero = study.cover ?? project.image;
  const category = categories.find((c) => c.id === project.categories[0])?.label;
  const isApp = Boolean(project.apps?.length);
  const gallery = Array.from(
    { length: isApp ? PHONE_GALLERY_SLOTS : GALLERY_SLOTS },
    (_, i) => project.gallery?.[i],
  );

  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative text-black">
        <article className="px-gutter pt-32 md:pt-40 pb-24 md:pb-32">
          {/* Source order is title, visuals, write-up, so phones read them in
              that order; from lg the visuals move to the left column, spanning
              both rows, with the title and write-up stacked on the right. */}
          <div className="grid gap-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
            <header className="@container lg:col-start-2 lg:row-start-1 lg:text-right">
              <h1 className="uppercase font-[500] tracking-[-0.03em] leading-[0.95] break-words text-[clamp(2.5rem,13cqw,6.5rem)]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-black/70 lg:ml-auto lg:text-justify">
                {project.summary}
              </p>
              {!project.hideSiteLink && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-black/80"
                >
                  Visit site
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.apps && (
                <ul className="mt-8 space-y-4">
                  {project.apps.map((app) => (
                    <li key={app.name}>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-black/40">{app.name}</p>
                      <div className="mt-2 flex flex-wrap gap-2 lg:justify-end">
                        {app.appStore && (
                          <StoreLink href={app.appStore} label="App Store" app={app.name} />
                        )}
                        {app.googlePlay && (
                          <StoreLink href={app.googlePlay} label="Google Play" app={app.name} />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </header>

            {/* Pinned while the write-up scrolls past it — only on screens tall
                enough to show the whole column, so the tiles are never cut off. */}
            <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-start lg:[@media(min-height:800px)]:sticky lg:[@media(min-height:800px)]:top-28">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={hero}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                ) : hero ? (
                  <Image
                    src={hero}
                    alt={`${project.title} ${study.cover ? 'platform' : 'website'}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`object-cover ${study.cover ? 'object-center' : 'object-top'}`}
                  />
                ) : null}
                {category && (
                  <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white text-xs uppercase tracking-[0.12em] text-black">
                    {category}
                  </span>
                )}
              </div>

              <Gallery title={project.title} slots={gallery} phone={isApp} />
            </div>

            <div className="lg:col-start-2 lg:row-start-2">
              <div className="lg:mt-24 space-y-10 md:space-y-12">
                <Row heading="The problem">{study.problem}</Row>
                <Row heading="Our approach">{study.approach}</Row>
                {study.changes && (
                  <Row heading="What we changed">
                    <ul className="space-y-2 text-left">
                      {study.changes.map((change) => (
                        <li key={change.title}>
                          <span className="font-[600] text-black">{change.title}.</span>{' '}
                          {change.body}
                        </li>
                      ))}
                    </ul>
                  </Row>
                )}
                <Row heading="The result">
                  {study.result.text}
                  {study.result.emphasis && (
                    <>
                      {' '}
                      <strong className="font-[600] text-black">{study.result.emphasis}</strong>
                    </>
                  )}
                </Row>
              </div>

              {study.stats && (
                <section aria-label="Results" className="mt-12 md:mt-14 border-t border-black/20 pt-8">
                  <ul className="grid grid-cols-3 gap-4 text-center">
                    {study.stats.map((stat) => (
                      <li key={stat.label}>
                        <p className="font-[500] tracking-[-0.02em] text-2xl md:text-4xl">{stat.value}</p>
                        <p className="mt-2 text-[11px] md:text-xs text-black/60">{stat.label}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-20 md:mt-32 flex items-center justify-between gap-6 border-t border-black/10 pt-8"
          >
            <span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-black/40">
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
        </article>
        <LetsTalk cta />
      </main>
      <Footer />
    </div>
  );
}

/** Outlined pill linking to an app's store listing. */
function StoreLink({ href, label, app }: { href: string; label: string; app: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/20 text-sm font-medium tracking-wide transition-colors duration-300 hover:border-black"
    >
      {label}
      <ArrowUpRight
        size={15}
        strokeWidth={2}
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span className="sr-only">: {app} (opens in a new tab)</span>
    </a>
  );
}

/** Heading on the left, copy as a narrower block pushed to the right. */
function Row({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-center md:gap-8">
      <h2 className="font-[500] text-base md:text-lg">{heading}</h2>
      <div className="text-sm leading-relaxed text-black/70 md:text-justify">{children}</div>
    </section>
  );
}
