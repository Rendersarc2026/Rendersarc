'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[99999] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        backgroundColor: '#FFFFFF',
        opacity: 0.7,
      }}
    />
  );
}
