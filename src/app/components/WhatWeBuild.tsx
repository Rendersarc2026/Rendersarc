'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';
import { categories } from '@/app/data/work';

/**
 * Home-page teaser for /work. Each category links straight into the matching
 * filter, and the button opens the full, unfiltered grid.
 */
export function WhatWeBuild() {
  return (
    <section id="projects" className="bg-white px-6 md:px-10 lg:px-16 xl:px-24 pb-24 md:pb-32">
      <div className="rounded-[2rem] bg-[#f4f4f4] px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-black font-[700] tracking-[-0.02em] leading-[1.1] text-[clamp(2rem,5vw,4rem)]"
        >
          What we build,
          <br />
          specifically
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-2.5 max-w-[52rem]"
        >
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/work?category=${category.id}`}
                className="block px-5 py-2.5 rounded-full border border-black/10 text-sm text-black/60 transition-colors duration-300 hover:border-black hover:text-black"
              >
                {category.label}
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-12 md:mt-14"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-black border border-black rounded-full text-white transition-all duration-300 font-medium tracking-wide hover:bg-white hover:text-black"
          >
            View our work
            <MoveRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
