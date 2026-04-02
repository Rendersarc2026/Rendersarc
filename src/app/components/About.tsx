'use client';

import { motion } from 'motion/react';

const values = [
  {
    number: '01',
    title: 'Purposeful Design',
    desc: 'Every pixel has a reason. We design with intent, ensuring each element serves a clear and measurable goal.',
  },
  {
    number: '02',
    title: 'Strategic Thinking',
    desc: 'Great design starts with understanding your business, your audience, and your long-term ambitions.',
  },
  {
    number: '03',
    title: 'Long-term Partnership',
    desc: 'We build lasting relationships, supporting your growth long after a project launches.',
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10 md:mb-16"
        >
          <div className="h-px w-10 bg-[#00ea77]" />
          <span className="text-[#00ea77] text-xs tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(0,234,119,0.3)]">
            About Renders Arc
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 font-extralight text-white tracking-tight">
              A creative studio
              <br />
              driven by{' '}
              <span className="text-[#00ea77] drop-shadow-[0_0_10px_rgba(0,234,119,0.2)]">
                results
              </span>
            </h2>
            <p className="leading-relaxed mb-6 text-base md:text-lg text-white/50 font-light">
              Renders Arc is not just another design agency — it's a creative partner dedicated to helping businesses amplify their growth through exceptional design solutions.
            </p>
            <p className="leading-relaxed text-base md:text-lg text-white/50 font-light">
              Founded on the belief that design is a business tool, we combine aesthetics with strategy to deliver work that makes a lasting impact.
            </p>
            <div
              className="mt-12 h-px bg-gradient-to-r from-white/10 to-transparent"
            />
          </motion.div>

          {/* Right — values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-1 auto-rows-fr gap-6 relative"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex gap-6 p-7 xl:p-9 rounded-[2rem] transition-all overflow-hidden bg-white/[0.03] border border-white/5 hover:border-[#00ea77]/30 shadow-xl h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ea77]/0 via-[#00ea77]/5 to-[#00ea77]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.span
                  className="text-sm mt-1 flex-shrink-0 font-mono tracking-widest text-[#00ea77] drop-shadow-[0_0_8px_rgba(0,234,119,0.4)]"
                >
                  {v.number}
                </motion.span>
                <div className="relative z-10">
                  <h4 className="mb-2 text-xl font-light text-white group-hover:text-[#00ea77] transition-colors duration-300">
                    {v.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-white/50 group-hover:text-white/80 transition-colors duration-300">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
