import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { TrueFiveHero } from '../components/TrueFiveHero';
import { TrueFive } from '../components/TrueFive';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Process — Renders Arc',
  description: 'How a project runs, from discovery through launch and iteration.',
};

export default function ProcessPage() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative">
        <TrueFiveHero />
        <TrueFive />
      </main>
      <Footer />
    </div>
  );
}
