'use client';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';


import { CustomCursor } from './components/CustomCursor';

import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Industries } from './components/Industries';
import { Clients } from './components/Clients';

export default function Home() {
  return (
    <div className="size-full bg-black relative overflow-x-clip cursor-none">
      <CustomCursor />
      <Navigation />
      <main className="relative">
        <Hero />
        <Industries />
        <About />
        <Services />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
