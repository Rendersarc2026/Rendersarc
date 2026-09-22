import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { PageHeader } from '../components/PageHeader';
import { Faq } from '../components/Faq';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'FAQ — Renders Arc',
  description: 'Timelines, pricing, support and what we need from you to start.',
};

export default function FaqPage() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative">
        <PageHeader
          eyebrow="FAQ"
          title="Questions, answered"
          intro="The things clients ask before we start. Placeholder answers for now."
        />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
