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
    <section id="services" className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-xs tracking-widest uppercase">
                What we do
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ color: '#FFFFFF' }}>
              Services tailored
              <br />
              <span className="italic font-serif" style={{ color: 'rgba(255,255,255,0.45)' }}>
                to your needs
              </span>
            </h2>
          </div>

          <button
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
          >
            View all projects
            <ArrowUpRight size={14} />
          </button>
        </motion.div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl cursor-pointer gap-6 transition-all"
              style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.2)';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#1A1A1A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#111111';
              }}
            >
              <div className="flex items-start gap-6">
                <span className="text-xs mt-1 w-6 flex-shrink-0 tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {service.number}
                </span>
                <div>
                  <h3 className="text-2xl mb-2 relative inline-flex" style={{ color: '#FFFFFF' }}>
                    {service.title}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ width: '100%' }}
                    />
                  </h3>
                  <p className="text-sm leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1.5 rounded-full text-xs"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.03)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
