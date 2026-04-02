'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

// Import the logos
import parkLegal from '@/assets/ourClients/parklegal.png';
import rootsAndLeaps from '@/assets/ourClients/rootsandleaps.png';
import silentPeak from '@/assets/ourClients/silentpeak.png';

const clients = [
  { name: 'Park Legal', logo: parkLegal },
  { name: 'Roots and Leaps', logo: rootsAndLeaps },
  { name: 'Silent Peak', logo: silentPeak },
];

export function Clients() {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-y border-white/10">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-extralight text-center text-black tracking-wider">
          Our <span className="font-bold">Clients</span>
        </h2>
      </div>

      <div className="flex w-full group relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-0 z-10 pointer-events-none via-transparent to-black" />

        {/* Carousel */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex flex-none gap-16 md:gap-32 pr-16 md:pr-32 items-center"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-none opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-12 md:h-16 w-auto object-contain mix-blend-screen"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
