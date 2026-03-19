import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      style={{ backgroundColor: '#1E2130' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,123,106,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(221,208,188,1) 1px, transparent 1px), linear-gradient(90deg, rgba(221,208,188,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Decorative top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #8B7B6A, transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-12"
          style={{
            border: '1px solid rgba(139,123,106,0.35)',
            borderRadius: '999px',
            padding: '8px 20px',
            backgroundColor: 'rgba(139,123,106,0.08)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#8B7B6A' }}
          />
          <span style={{ color: '#8B7B6A' }} className="text-xs tracking-widest uppercase">
            Premium Design & Digital Agency
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-8 space-y-2"
        >
          <h1
            className="text-6xl md:text-8xl lg:text-[96px] leading-none tracking-tight"
            style={{ color: '#DDD0BC' }}
          >
            Designing
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-[96px] leading-none tracking-tight">
            <span style={{ color: '#DDD0BC' }}>Digital </span>
            <span
              className="italic font-serif"
              style={{ color: '#8B7B6A' }}
            >
              futures
            </span>
          </h1>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mb-8"
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: '#8B7B6A',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-14 leading-relaxed"
          style={{ color: '#8B7B6A' }}
        >
          We craft purposeful digital experiences — from strategy and branding
          to web design and marketing — built to elevate your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all"
            style={{ backgroundColor: '#8B7B6A', color: '#1E2130' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#a08e7c';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8B7B6A';
            }}
          >
            <span className="text-sm tracking-widest uppercase">Start a project</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all"
            style={{ border: '1px solid rgba(139,123,106,0.35)', color: '#DDD0BC' }}
          >
            Our services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-28 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20"
        >
          {[
            { value: '120+', label: 'Projects delivered' },
            { value: '8 yrs', label: 'Industry experience' },
            { value: '98%', label: 'Client satisfaction' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center relative">
              {i > 0 && (
                <div
                  className="hidden sm:block absolute -left-10 top-1/2 -translate-y-1/2 w-px h-8"
                  style={{ backgroundColor: 'rgba(139,123,106,0.3)' }}
                />
              )}
              <div
                className="text-3xl tracking-tight mb-1"
                style={{ color: '#DDD0BC' }}
              >
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: '#8B7B6A' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #1E2130)' }}
      />
    </section>
  );
}
