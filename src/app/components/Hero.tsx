'use client';

import { motion } from 'motion/react';
import ColorBends from '@/components/ColorBends';
import DecryptedText from '@/components/DecryptedText';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-32 md:pt-24 md:pb-12 px-6 overflow-hidden bg-black"
    >
      {/* Background glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ea77]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Optional particle background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          autoRotate={0}
        />
      </div>

      <div className="relative z-10 max-w-[95rem] mx-auto text-center w-full mt-4 md:mt-10">
        <div className="mb-8 space-y-1 md:space-y-2 lg:space-y-4 font-sans tracking-tight">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-8xl lg:text-[100px] leading-[1.1] font-extralight flex flex-wrap items-center justify-center gap-x-4 md:gap-x-10 gap-y-2"
          >


            <span className="text-white/30 whitespace-nowrap">
              <DecryptedText
                text="Living in the"
                animateOn="view"
                revealDirection="start"
                speed={150}
                characters="01{}[];:,.()<>!=+-*/%&|^~#$@_"
              />
            </span>

            <span className="text-white flex items-center gap-3 md:gap-6">
              {/* <span className="text-[#00ea77] drop-shadow-[0_0_25px_rgba(0,234,119,0.8)] shrink-0">
                <svg width="0.7em" height="0.7em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
              </span> */}
              <DecryptedText
                text="Future"
                animateOn="view"
                revealDirection="start"
                speed={150}
                characters="01{}[];:,.()<>!=+-*/%&|^~#$@_"
              />
              <span className="text-[#00ea77] drop-shadow-[0_0_25px_rgba(0,234,119,0.8)] shrink-0">
                <svg width="0.7em" height="0.7em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
              </span>
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-extralight text-white/50 pt-2"
          >
            <DecryptedText
              text="Building What's Missing"
              animateOn="view"
              revealDirection="start"
              speed={150}
              characters="01{}[];:,.()<>!=+-*/%&|^~#$@_"
            />
          </motion.h2>
        </div>
      </div>
    </section >
  );
}

