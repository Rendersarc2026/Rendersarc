import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth spring for the ring — lags behind the dot
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const ringX = useSpring(dotX, springConfig);
  const ringY = useSpring(dotY, springConfig);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      });
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = !!(
        target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')
      );
      setHovered(isHoverable);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousemove', checkHover, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Outer ring — springs behind */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 48 : 36,
          height: hovered ? 48 : 36,
          border: '1.5px solid rgba(255,255,255,0.55)',
          backgroundColor: hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
          scale: clicked ? 0.85 : 1,
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, scale 0.1s ease',
        }}
      />

      {/* Inner dot — instant */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 5 : 6,
          height: hovered ? 5 : 6,
          backgroundColor: '#FFFFFF',
          opacity: hovered ? 0.5 : 1,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
