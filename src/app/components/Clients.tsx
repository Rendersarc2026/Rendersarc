'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

// Import the logos
import kala from '@/assets/ourClients/kala.png';
import meTrends from '@/assets/ourClients/metrends.png';
import parkLegal from '@/assets/ourClients/parklegal.png';
import rootsAndLeaps from '@/assets/ourClients/rootsandleaps.png';
import silentPeak from '@/assets/ourClients/silentpeak.png';
import skei from '@/assets/ourClients/skei.png';
import fetchLogo from '@/assets/ourClients/fetch-clean.png';

const clients = [
  { name: 'Kala', logo: kala, className: 'h-8 md:h-11 w-auto' },
  { name: 'MeTrends', logo: meTrends, className: 'h-5 md:h-7 w-auto' },
  { name: 'Park Legal', logo: parkLegal, className: 'h-10 md:h-14 w-auto' },
  { name: 'Roots and Leaps', logo: rootsAndLeaps, className: 'h-5 md:h-7 w-auto' },
  { name: 'Silent Peak', logo: silentPeak, className: 'h-10 md:h-14 w-auto' },
  { name: 'Skei', logo: skei, className: 'h-9 md:h-12 w-auto' },
  { name: 'Fetch', logo: fetchLogo, className: 'h-6 md:h-8 w-auto' },
];

export function Clients() {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-y border-black/5">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-extralight text-center text-black">
          Trusted <span className="font-bold">By</span>
        </h2>
      </div>

      <div className="flex flex-col gap-10 md:gap-14 w-full group relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white" />

        {/* Row 1: Scroll to left */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex flex-none gap-16 md:gap-32 items-center"
          >
            {[...clients, ...clients, ...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`row1-${client.name}-${index}`}
                className="flex-none opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 flex items-center justify-center"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className={`${client.className || 'h-12 md:h-16 w-auto'} object-contain`}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scroll to right */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex flex-none gap-16 md:gap-32 items-center"
          >
            {[...clients, ...clients, ...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`row2-${client.name}-${index}`}
                className="flex-none opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 flex items-center justify-center"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className={`${client.className || 'h-12 md:h-16 w-auto'} object-contain`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
