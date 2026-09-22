import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { Faq } from '../components/Faq';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'FAQ — Renders Arc',
  description:
    'Cost, timelines, ownership, content, updates and revisions — the questions we are asked most.',
};

export default function FaqPage() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative">
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
