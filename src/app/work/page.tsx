import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { PageHeader } from '../components/PageHeader';
import { WorkGrid } from '../components/WorkGrid';
import { LetsTalk } from '../components/LetsTalk';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Work — Renders Arc',
  description:
    'Websites, interactive experiences, ecommerce, custom software and mobile apps we have designed and built.',
};

export default function WorkPage() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative">
        <PageHeader
          eyebrow="Work"
          title="What we build, specifically"
          intro="Live sites and products we have designed and built. Filter by what you need, then open any of them to see it working."
        />
        {/* The grid reads its filter from the URL, which needs a Suspense
            boundary for the page to prerender. */}
        <Suspense>
          <WorkGrid />
        </Suspense>
        <LetsTalk cta />
      </main>
      <Footer />
    </div>
  );
}
