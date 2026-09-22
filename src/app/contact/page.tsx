import type { Metadata } from 'next';
import { Navigation } from '../components/Navigation';
import { LetsTalk } from '../components/LetsTalk';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Contact — Renders Arc',
  description: 'Start a project with Renders Arc.',
};

export default function ContactPage() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative pt-20">
        <LetsTalk />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
