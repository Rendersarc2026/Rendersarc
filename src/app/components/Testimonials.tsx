'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { testimonials } from '@/app/data/work';

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const readEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setAtStart(scroller.scrollLeft <= 1);
    setAtEnd(scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1);
  }, []);

  const scheduleReadEdges = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      readEdges();
    });
  }, [readEdges]);

  useEffect(() => {
    readEdges();
    window.addEventListener('resize', scheduleReadEdges);
    return () => {
      window.removeEventListener('resize', scheduleReadEdges);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [readEdges, scheduleReadEdges]);

  // Pages by whatever is currently visible — two cards on desktop, one on mobile.
  const page = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * scroller.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="bg-white py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-black font-[500] uppercase tracking-[-0.01em] text-2xl md:text-[28px]">
            Real stories
          </h2>
          <p className="mt-3 text-sm md:text-base text-black/70">
            Real stories from teams we&apos;ve partnered with:
          </p>
        </motion.div>

        <div className="relative mt-16 md:mt-24">
          <button
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Previous testimonials"
            className="hidden lg:flex absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-10 items-center justify-center text-black/70 hover:text-black disabled:opacity-25 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>

          <div
            ref={scrollerRef}
            onScroll={scheduleReadEdges}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none"
          >
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.id}
                className="shrink-0 snap-start w-full md:w-[calc(50%-0.5rem)] bg-[#f4f4f4] p-8 md:p-14 flex flex-col"
              >
                <blockquote className="text-sm md:text-[15px] leading-relaxed text-black/80 max-w-[54ch]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 md:mt-12 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full bg-black/10 overflow-hidden flex items-center justify-center shrink-0">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-black/40" aria-hidden />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-[500] text-black">{testimonial.name}</p>
                    <p className="text-xs text-black/50 mt-0.5">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Next testimonials"
            className="hidden lg:flex absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-10 items-center justify-center text-black/70 hover:text-black disabled:opacity-25 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
