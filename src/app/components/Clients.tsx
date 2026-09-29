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
import euphrates from '@/assets/ourClients/euphrates.png';
import tigris from '@/assets/ourClients/tigris.png';

const clients = [
  { name: 'Kala', logo: kala, className: 'h-8 md:h-9 w-auto' },
  { name: 'MeTrends', logo: meTrends, className: 'h-5 w-auto' },
  { name: 'Park Legal', logo: parkLegal, className: 'h-10 md:h-11 w-auto' },
  { name: 'Roots and Leaps', logo: rootsAndLeaps, className: 'h-5 w-auto' },
  { name: 'Silent Peak', logo: silentPeak, className: 'h-10 md:h-11 w-auto' },
  { name: 'Skei', logo: skei, className: 'h-9 md:h-10 w-auto' },
  { name: 'Fetch', logo: fetchLogo, className: 'h-6 w-auto' },
  { name: 'Euphrates Asia', logo: euphrates, className: 'h-6 md:h-7 w-auto' },
  { name: 'Tigris Asia', logo: tigris, className: 'h-4 md:h-5 w-auto' },
];

export function Clients() {
  return (
    <section id="clients" className="bg-white py-24 md:py-32">
      <div className="px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-[1400px] mx-auto"
        >
          <h2 className="text-black font-[700] uppercase tracking-[-0.01em] text-2xl md:text-[28px]">
            Trusted by
          </h2>
          <p className="mt-3 text-sm md:text-base text-black/50">
            Brands we&apos;ve built, shipped and scaled with.
          </p>
        </motion.div>
      </div>

      {/* Logo wall: 5 columns on desktop; flex-wrap keeps a short last row centred. */}
      <div className="mt-14 md:mt-20 px-6 md:px-10 lg:px-16 xl:px-24">
        <ul className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-y-14 md:gap-y-20">
          {clients.map((client, i) => (
            <motion.li
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 5) * 0.08 }}
              className="basis-1/2 md:basis-1/3 lg:basis-1/5 flex items-center justify-center h-12 md:h-14 px-4"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                className={`${client.className} max-w-full object-contain`}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
