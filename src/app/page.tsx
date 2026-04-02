'use client';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';


import { CustomCursor } from './components/CustomCursor';

import dynamic from 'next/dynamic';

const Services = dynamic(() => import('./components/Services').then((mod) => mod.Services));
const About = dynamic(() => import('./components/About').then((mod) => mod.About));
const Contact = dynamic(() => import('./components/Contact').then((mod) => mod.Contact));
const Footer = dynamic(() => import('./components/Footer').then((mod) => mod.Footer));
const Industries = dynamic(() => import('./components/Industries').then((mod) => mod.Industries));
const Clients = dynamic(() => import('./components/Clients').then((mod) => mod.Clients));

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
