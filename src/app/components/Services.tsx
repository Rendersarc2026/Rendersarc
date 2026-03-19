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
    <section id="services" className="py-32 px-6" style={{ backgroundColor: '#1E2130' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10" style={{ backgroundColor: '#8B7B6A' }} />
              <span style={{ color: '#8B7B6A' }} className="text-xs tracking-widest uppercase">
                What we do
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{ color: '#DDD0BC' }}
            >
              Services tailored
              <br />
              <span className="italic font-serif" style={{ color: '#8B7B6A' }}>
                to your needs
              </span>
            </h2>
          </div>

          <button
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all"
            style={{ border: '1px solid rgba(139,123,106,0.35)', color: '#DDD0BC' }}
          >
            View all projects
            <ArrowUpRight size={14} />
          </button>
        </motion.div>

        {/* Services */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl cursor-pointer gap-6 transition-all"
              style={{
                backgroundColor: '#3C3D4B',
                border: '1px solid rgba(139,123,106,0.12)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,123,106,0.45)';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#44455a';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,123,106,0.12)';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#3C3D4B';
              }}
            >
              {/* Number + title + desc */}
              <div className="flex items-start gap-6">
                <span
                  className="text-xs mt-1 w-6 flex-shrink-0 tracking-widest"
                  style={{ color: '#8B7B6A' }}
                >
                  {service.number}
                </span>
                <div>
                  <h3 className="text-2xl mb-2" style={{ color: '#DDD0BC' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-md" style={{ color: '#8B7B6A' }}>
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1.5 rounded-full text-xs"
                    style={{
                      border: '1px solid rgba(139,123,106,0.25)',
                      color: '#8B7B6A',
                      backgroundColor: 'rgba(30,33,48,0.5)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                style={{
                  border: '1px solid rgba(139,123,106,0.35)',
                  color: '#8B7B6A',
                }}
              >
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
