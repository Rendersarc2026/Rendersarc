'use client';

import { motion } from 'motion/react';

/**
 * Shared masthead for the standalone pages, so /process, /faq and /contact all
 * open the same way instead of each inventing its own heading treatment.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="bg-white px-6 lg:px-12 pt-40 md:pt-48 pb-16 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-[1400px] mx-auto"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-black/40">{eyebrow}</p>
        <h1 className="mt-6 text-black font-[500] tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,7vw,6rem)]">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 text-base md:text-lg leading-relaxed text-black/60 max-w-[54ch]">
            {intro}
          </p>
        )}
      </motion.div>
    </header>
  );
}
