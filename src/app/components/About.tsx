'use client';

import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="min-h-screen bg-black flex items-center justify-center py-20 px-6 relative overflow-hidden text-white">
      <div className="max-w-[1400px] mx-auto w-full relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center px-12 md:px-20">
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-tight uppercase leading-none">
              About Us
            </h2>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h3 className="text-xl md:text-2xl font-normal mb-4 text-white">
              The Trusted Expert
            </h3>
            <p className="text-white/70 text-base md:text-[1.1rem] leading-relaxed font-light">
              RendersArc assembles dedicated expert teams to deliver high-impact digital solutions, ranging from web and mobile development to custom software and cybersecurity. Built on a proven consulting model, we offer scalable, reliable partnerships designed to drive your business forward. With a strong track record serving clients across the Middle East, UK, Europe, and India, we build systems that solve core business challenges with lasting value.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
