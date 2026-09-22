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
  { name: 'Kala', logo: kala, className: 'h-8 md:h-9 w-auto' },
  { name: 'MeTrends', logo: meTrends, className: 'h-5 w-auto' },
  { name: 'Park Legal', logo: parkLegal, className: 'h-10 md:h-11 w-auto' },
  { name: 'Roots and Leaps', logo: rootsAndLeaps, className: 'h-5 w-auto' },
  { name: 'Silent Peak', logo: silentPeak, className: 'h-10 md:h-11 w-auto' },
  { name: 'Skei', logo: skei, className: 'h-9 md:h-10 w-auto' },
  { name: 'Fetch', logo: fetchLogo, className: 'h-6 w-auto' },
];

/** Fades the row into the page instead of cutting it off at the viewport edge. */
const EDGE_FADE =
  'linear-gradient(to right, transparent 0, #000 6rem, #000 calc(100% - 6rem), transparent 100%)';

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

      {/* Full-bleed so the loop reads as continuous rather than restarting at a
          container edge. Two identical copies of the row make the seam invisible;
          the second is hidden from assistive tech. */}
      <div
        className="mt-14 md:mt-20 overflow-hidden"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <div
          className="marquee-track flex w-max items-center"
          style={{ ['--marquee-duration' as string]: '45s' }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center shrink-0">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="px-10 md:px-16 flex items-center justify-center"
                >
                  <Image
                    src={client.logo}
                    alt={copy === 0 ? `${client.name} logo` : ''}
                    className={`${client.className} object-contain grayscale opacity-45 hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
