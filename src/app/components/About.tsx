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
    <section id="about" className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10 md:mb-16"
        >
          <div className="h-px w-10 bg-black" />
          <span className="text-black text-xs tracking-widest uppercase font-bold">
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 font-[700] text-black tracking-tight">
              Before Anything Exists, <br />
              It Is <span className="text-black">Imagined</span>.
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-black/65 font-[400] leading-relaxed">
              <p>
                Every system, every structure, and every piece of technology we interact with was once just a thought.
                It was a possibility waiting for someone to believe in it enough to bring it to life.
              </p>

              <p className="text-black/80">
                We exist for that moment, the moment when ideas decide to become real.
                We believe people are not just users of technology; they are creators of reality itself.
              </p>

              <p>
                At <span className="text-black font-normal uppercase tracking-wider">Renders Arc</span>, we build the bridge between imagination and execution.
                We study industries and understand their rhythms, gaps, and hidden inefficiencies.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Methodology & Values Divider */}
        <div className="h-px w-full bg-gradient-to-r from-black/25 via-black/10 to-transparent mb-24" />

        {/* Methodology & Values Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Methodology */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 font-[700] text-black tracking-tight">
              A Methodology
              <br />
              Driven by{' '}
              <span className="text-black">
                Results
              </span>
            </h3>
            <div className="space-y-6 text-base md:text-lg text-black/55 font-[400] leading-relaxed">
              <p>
                We believe that exceptional design is the result of a deliberate and strategic process. Our approach is designed to bridge the gap between creative vision and business objectives.
              </p>
              <p>
                By combining deep research with artisanal craft, we create digital experiences that don't just look stunning but perform at the highest level.
              </p>
              <p className="text-black/70">
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
            className="grid grid-cols-1 auto-rows-fr relative"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-6 md:gap-10 py-8 xl:py-10 border-b border-black/10"
              >
                <span className="text-xs mt-2 flex-shrink-0 tabular-nums tracking-widest text-black/35">
                  {v.number}
                </span>
                <div>
                  <h4 className="mb-2 text-xl font-[700] tracking-tight text-black">
                    {v.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-black/55 max-w-[46ch]">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
    </section>
  );
}
