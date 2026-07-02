'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';

const services = [
  {
    number: '01',
    title: 'Brand Strategy',
    description:
      'We build brands that connect — from guidelines and identity systems to full rebranding initiatives.',
    tags: ['Brand Guidelines', 'Identity', 'Rebranding', 'Analysis'],
  },
  {
    number: '02',
    title: 'Web Development',
    description:
      'Custom, responsive websites and web applications designed for optimal performance and user experience.',
    tags: ['Custom Website', 'Responsive', 'Frontend', 'Backend'],
  },
  {
    number: '03',
    title: 'App Development',
    description:
      'High-performance native and cross-platform mobile applications tailored to your business needs.',
    tags: ['iOS', 'Android', 'Cross-Platform', 'Mobile Solutions'],
  },
  {
    number: '04',
    title: 'UI/UX Design',
    description:
      'Interfaces crafted for clarity and delight — from wireframes to polished, user-tested final designs.',
    tags: ['User Interface', 'User Experience', 'Wireframing', 'Prototyping'],
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const card = container.children[0] as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth + 32; // card width + gap (8 is 32px)
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < services.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="services" className="py-32 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#00ea77]" />
              <span className="text-[#00ea77] text-xs tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(0,234,119,0.3)]">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl leading-tight font-light text-black">
              Choose Your
              <br />
              <span className="text-black/50">
                Service Avenue
              </span>
            </h2>
          </div>
        </motion.div>

        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="w-screen relative left-1/2 -translate-x-1/2 flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-8 pb-6 mobile-scroll-container scroll-smooth scrollbar-none md:w-full md:static md:left-0 md:translate-x-0 md:grid md:grid-cols-2 md:overflow-x-visible md:snap-none md:pb-0 md:px-0 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="group flex flex-col justify-between p-8 md:p-10 rounded-[2rem] cursor-pointer gap-8 transition-all relative overflow-hidden bg-[#fafafa] border border-black/5 w-[80vw] sm:w-[60vw] md:w-full shrink-0 snap-center"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ea77]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#00ea77] font-mono text-xl tracking-widest">
                    {service.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl mb-3 font-medium text-black group-hover:text-[#00ea77] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-black/50 group-hover:text-black/80 transition-colors duration-300 pt-2">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-4 py-2 rounded-full text-xs font-light tracking-wide bg-black/5 text-black/60 border border-black/5 group-hover:border-[#00ea77]/30 group-hover:text-black transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
              const container = containerRef.current;
              if (container) {
                const card = container.children[index] as HTMLElement;
                if (card) {
                  const cardWidth = card.offsetWidth + 32;
                  container.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }
            }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-6 bg-[#00ea77]' : 'w-2 bg-black/10'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
