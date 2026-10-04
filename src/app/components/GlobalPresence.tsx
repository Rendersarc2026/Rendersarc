"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function GlobalPresence() {
  return (
    <section
      id="global-presence"
      className="bg-black py-16 md:py-24 px-gutter border-t border-white/10 text-white relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#161717] shadow-2xl"
        >
          <div className="relative aspect-[1443/850] w-full">
            <Image
              src="/images/global-presence.png"
              alt="A Growing Global Presence - highlighting UAE, Qatar, Saudi Arabia, India, Australia, and UK"
              fill
              className="object-contain select-none pointer-events-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1280px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
