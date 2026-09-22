'use client';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';

import dynamic from 'next/dynamic';

const WhatWeDo = dynamic(() => import('./components/WhatWeDo').then((mod) => mod.WhatWeDo));
const WhatWeBuild = dynamic(() => import('./components/WhatWeBuild').then((mod) => mod.WhatWeBuild));
const Footer = dynamic(() => import('./components/Footer').then((mod) => mod.Footer));
const Clients = dynamic(() => import('./components/Clients').then((mod) => mod.Clients));
const Testimonials = dynamic(() => import('./components/Testimonials').then((mod) => mod.Testimonials));
const LetsTalk = dynamic(() => import('./components/LetsTalk').then((mod) => mod.LetsTalk));

export default function Home() {
  return (
    <div className="size-full bg-white relative overflow-x-clip">
      <Navigation />
      <main className="relative">
        <Hero />
        <WhatWeDo />
        <WhatWeBuild />
        <Clients />
        <Testimonials />
        <LetsTalk cta />
      </main>
      <Footer />
    </div>
  );
}
