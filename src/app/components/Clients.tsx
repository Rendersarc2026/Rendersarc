'use client';

import Image, { type StaticImageData } from 'next/image';
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

/**
 * `weight` nudges logos whose ink is unusually light (thin line work) or heavy
 * (solid wordmarks) so they read at the same visual weight as the rest.
 */
const clients = [
  { name: 'Kala', logo: kala, weight: 1.15 },
  { name: 'MeTrends', logo: meTrends, weight: 0.9 },
  { name: 'Park Legal', logo: parkLegal, weight: 1 },
  { name: 'Roots and Leaps', logo: rootsAndLeaps, weight: 1 },
  { name: 'Silent Peak', logo: silentPeak, weight: 1 },
  { name: 'Skei', logo: skei, weight: 1 },
  { name: 'Fetch', logo: fetchLogo, weight: 0.95 },
  { name: 'Euphrates Asia', logo: euphrates, weight: 1.15 },
  { name: 'Tigris Asia', logo: tigris, weight: 0.9 },
];

/**
 * Gives every logo roughly the same area rather than the same height, so wide
 * wordmarks don't dominate and square marks don't shrink. Returned as a
 * multiple of `--logo-size` (the edge of an equivalent square).
 */
function logoHeight(logo: StaticImageData, weight: number) {
  const ratio = logo.width / logo.height;
  return `calc(var(--logo-size) * ${(weight / Math.sqrt(ratio)).toFixed(3)})`;
}

export function Clients() {
  return (
    <section id="clients" className="bg-white py-24 md:py-32">
      <div className="px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
         
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
      <div className="mt-14 md:mt-20 px-gutter">
        <ul className="flex flex-wrap justify-center gap-y-12 md:gap-y-16 [--logo-size:44px] md:[--logo-size:54px]">
          {clients.map((client, i) => (
            <motion.li
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 5) * 0.08 }}
              className="basis-1/2 md:basis-1/3 lg:basis-1/5 flex items-center justify-center h-20 px-4"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                style={{ height: logoHeight(client.logo, client.weight) }}
                className="w-auto max-w-full object-contain"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
