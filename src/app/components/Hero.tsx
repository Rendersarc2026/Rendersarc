'use client';

import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-white px-6 lg:px-12 pt-32 md:pt-40 pb-10 md:pb-14"
    >
      {/* Headline */}
      <div className="flex-1 flex items-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-black font-[500] tracking-[-0.03em] leading-[1.12] text-[clamp(2rem,5.3vw,5rem)]"
        >
          We design around the five people
          <br className="hidden md:block" />{' '}
          who&apos;ll actually use it.
          <MoveRight
            className="inline-block align-middle ml-[0.25em] mb-[0.12em] w-[0.72em] h-[0.72em]"
            strokeWidth={2.75}
            aria-hidden
          />
        </motion.h1>
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        onClick={() => scrollToSection('contact')}
        className="group self-start flex items-center gap-1.5 text-black text-xs md:text-sm tracking-[0.08em] uppercase font-medium"
      >
        Start a project
        <span className="transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
        <span className="sr-only">Scroll to contact section</span>
      </motion.button>
    </section>
  );
}
