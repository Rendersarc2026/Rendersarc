import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { About } from '../components/About';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'About — Renders Arc',
  description: 'Learn more about Renders Arc and our purpose.',
};

export default function AboutPage() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}
