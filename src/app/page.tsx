'use client';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import dynamic from 'next/dynamic';


import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';

const Services = dynamic(() => import('./components/Services').then((mod) => mod.Services), { ssr: true });
const About = dynamic(() => import('./components/About').then((mod) => mod.About), { ssr: true });
const Contact = dynamic(() => import('./components/Contact').then((mod) => mod.Contact), { ssr: true });
const Footer = dynamic(() => import('./components/Footer').then((mod) => mod.Footer), { ssr: true });
const Industries = dynamic(() => import('./components/Industries').then((mod) => mod.Industries), { ssr: true });

export default function Home() {
  return (
    <div className="size-full bg-black relative overflow-x-clip cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main className="relative">
        <Hero />
        <Industries />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
