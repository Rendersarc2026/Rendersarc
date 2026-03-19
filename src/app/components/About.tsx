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
    <section id="about" className="py-32 px-6" style={{ backgroundColor: '#3C3D4B' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px w-10" style={{ backgroundColor: '#8B7B6A' }} />
          <span style={{ color: '#8B7B6A' }} className="text-xs tracking-widest uppercase">
            About Growaz
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl leading-tight mb-8"
              style={{ color: '#DDD0BC' }}
            >
              A creative studio
              <br />
              driven by{' '}
              <span className="italic font-serif" style={{ color: '#8B7B6A' }}>
                results
              </span>
            </h2>
            <p className="leading-relaxed mb-6 text-base" style={{ color: '#8B7B6A' }}>
              Growaz is not just another design agency — it's a creative partner dedicated to helping businesses amplify their growth through exceptional design solutions.
            </p>
            <p className="leading-relaxed text-base" style={{ color: '#8B7B6A' }}>
              Founded on the belief that design is a business tool, we combine aesthetics with strategy to deliver work that makes a lasting impact.
            </p>

            {/* Gold divider */}
            <div
              className="mt-12 h-px"
              style={{
                background: 'linear-gradient(90deg, #8B7B6A, transparent)',
              }}
            />
          </motion.div>

          {/* Right — values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 p-7 rounded-2xl transition-all"
                style={{
                  backgroundColor: 'rgba(30,33,48,0.5)',
                  border: '1px solid rgba(139,123,106,0.18)',
                }}
              >
                <span
                  className="text-xs mt-1 flex-shrink-0 tracking-widest"
                  style={{ color: '#8B7B6A' }}
                >
                  {v.number}
                </span>
                <div>
                  <h4 className="mb-2" style={{ color: '#DDD0BC' }}>
                    {v.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#8B7B6A' }}>
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
