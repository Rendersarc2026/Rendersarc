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
            About
          </span>
        </motion.div>

        {/* Vision Narrative */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 font-light text-white tracking-tight">
              Before Anything Exists, <br />
              It Is <span className="text-[#00ea77] drop-shadow-[0_0_10px_rgba(0,234,119,0.2)]">Imagined</span>.
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-white/70 font-light leading-relaxed">
              <p>
                Every system, every structure, and every piece of technology we interact with was once just a thought.
                It was a possibility waiting for someone to believe in it enough to bring it to life.
              </p>

              <p className="text-white/90">
                We exist for that moment, the moment when ideas decide to become real.
                We believe people are not just users of technology; they are creators of reality itself.
              </p>

              <p>
                At <span className="text-white font-normal uppercase tracking-wider">Renders Arc</span>, we build the bridge between imagination and execution.
                We study industries and understand their rhythms, gaps, and hidden inefficiencies.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Methodology & Values Divider */}
        <div className="h-px w-full bg-gradient-to-r from-[#00ea77]/30 via-white/10 to-transparent mb-24" />

        {/* Methodology & Values Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Methodology */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 font-light text-white tracking-tight">
              A Methodology
              <br />
              Driven by{' '}
              <span className="text-[#00ea77] drop-shadow-[0_0_10px_rgba(0,234,119,0.2)]">
                Results
              </span>
            </h3>
            <div className="space-y-6 text-base md:text-lg text-white/50 font-light leading-relaxed">
              <p>
                We believe that exceptional design is the result of a deliberate and strategic process. Our approach is designed to bridge the gap between creative vision and business objectives.
              </p>
              <p>
                By combining deep research with artisanal craft, we create digital experiences that don't just look stunning but perform at the highest level.
              </p>
              <p className="text-[#00ea77]/80">
                Technology shouldn’t be forced into a business. It should feel like it was always meant to be there.
              </p>
              <p>
                We design pathways for ideas to take form and for businesses to become what they were always capable of being.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Values Cards */}
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

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#00ea77]/[0.03] blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}
