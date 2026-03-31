'use client';

import { ArrowUpRight } from 'lucide-react';
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
    title: 'Web Design',
    description:
      'Custom, responsive websites designed to convert visitors into clients and reflect your brand perfectly.',
    tags: ['Custom Website', 'Responsive', 'Web Solutions', 'CMS'],
  },
  {
    number: '03',
    title: 'Digital Marketing',
    description:
      'Data-driven campaigns across channels — SEO, PPC, social, and email — to grow your audience.',
    tags: ['SEO', 'Pay-Per-Click', 'Email Marketing', 'Social Media'],
  },
  {
    number: '04',
    title: 'UI/UX Design',
    description:
      'Interfaces crafted for clarity and delight — from wireframes to polished, user-tested final designs.',
    tags: ['User Interface', 'Wireframing', 'Mobile App', 'Prototyping'],
  },
];

export function Services() {
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
              <span className="text-[#00ea77] text-xs tracking-widest uppercase font-semibold">
                What we do
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl leading-tight font-bold text-black">
              Choose your
              <br />
              <span className="text-black/50">
                service avenue
              </span>
            </h2>
          </div>

          <button
            className="group self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm tracking-widest uppercase font-semibold transition-all border border-black/10 hover:border-[#00ea77] text-black bg-white hover:bg-gray-50"
          >
            <span className="relative z-10 transition-colors duration-300">View all projects</span>
            <ArrowUpRight size={16} className="text-[#00ea77] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col justify-between p-8 md:p-10 rounded-[2rem] cursor-pointer gap-8 transition-all relative overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-xl hover:shadow-[#00ea77]/10"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ea77]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#00ea77] font-mono text-xl tracking-widest">
                    {service.number}
                  </span>

                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center transition-all duration-300 border border-white/10 group-hover:bg-[#00ea77]/10 text-white"
                  >
                    <ArrowUpRight size={18} className="text-[#00ea77] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl mb-3 font-semibold text-white group-hover:text-[#00ea77] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/50 group-hover:text-white/80 transition-colors duration-300 pt-2">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-4 py-2 rounded-full text-xs font-medium tracking-wide bg-white/5 text-white/60 border border-white/5 group-hover:border-[#00ea77]/30 group-hover:text-white transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
