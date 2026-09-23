import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { PageHeader } from '../components/PageHeader';
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
        <PageHeader
          eyebrow="Process"
          title="How the work runs"
          intro="Five steps, each with something you can hold at the end of it."
        />
        <TrueFive />
      </main>
      <Footer />
    </div>
  );
}
