'use client';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Industries } from './components/Industries';

export default function Home() {
  return (
    <div className="size-full bg-black relative overflow-x-hidden cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
