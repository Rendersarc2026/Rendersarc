import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { WorkGrid } from '../components/WorkGrid';
import { LetsTalk } from '../components/LetsTalk';
import { Footer } from '../components/Footer';
import { getProjects } from '@/app/data/projects';

export const metadata: Metadata = {
  title: 'Work — Renders Arc',
  description:
    'Websites, interactive experiences, ecommerce, custom software and mobile apps we have designed and built.',
};

// Projects come from the database; re-read at most every five minutes.
export const revalidate = 300;

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="size-full bg-black relative overflow-x-clip">
      <Navigation />
      <main className="relative">
        <h1 className="sr-only">Work</h1>
        {/* The grid reads its filter from the URL, which needs a Suspense
            boundary for the page to prerender. */}
        <Suspense>
          <WorkGrid projects={projects} />
        </Suspense>
        <LetsTalk cta />
      </main>
      <Footer />
    </div>
  );
}
