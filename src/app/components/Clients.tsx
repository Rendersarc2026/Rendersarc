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
  { name: 'Kala', logo: kala, className: 'h-8 md:h-10 w-auto' },
  { name: 'MeTrends', logo: meTrends, className: 'h-5 md:h-6 w-auto' },
  { name: 'Park Legal', logo: parkLegal, className: 'h-10 md:h-12 w-auto' },
  { name: 'Roots and Leaps', logo: rootsAndLeaps, className: 'h-5 md:h-6 w-auto' },
  { name: 'Silent Peak', logo: silentPeak, className: 'h-10 md:h-12 w-auto' },
  { name: 'Skei', logo: skei, className: 'h-9 md:h-11 w-auto' },
  { name: 'Fetch', logo: fetchLogo, className: 'h-6 md:h-7 w-auto' },
];

export function Clients() {
  return (
    <section id="clients" className="bg-white py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-black font-[600] uppercase tracking-[-0.01em] text-2xl md:text-[28px]">
            Trusted by
          </h2>
          <p className="mt-3 text-sm md:text-base text-black/70">
            Brands we&apos;ve built, shipped and scaled with:
          </p>
        </motion.div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              className="group bg-[#f4f4f4] aspect-[4/3] flex items-center justify-center p-6"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                className={`${client.className} object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
