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
      style={{ backgroundColor: '#000000' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Decorative top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-12"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '999px',
            padding: '8px 20px',
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FFFFFF' }} />
          <span style={{ color: 'rgba(255,255,255,0.6)' }} className="text-xs tracking-widest uppercase">
            Premium Design &amp; Digital Agency
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
            style={{ color: '#FFFFFF' }}
          >
            Designing
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-[96px] leading-none tracking-tight">
            <span style={{ color: '#FFFFFF' }}>Digital </span>
            <span className="italic font-serif" style={{ color: 'rgba(255,255,255,0.45)' }}>
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
          style={{ width: '60px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-14 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
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
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all font-semibold"
            style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E5E5';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF';
            }}
          >
            <span className="text-sm tracking-widest uppercase">Start a project</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
            }}
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
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                />
              )}
              <div className="text-3xl tracking-tight mb-1" style={{ color: '#FFFFFF' }}>
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #000000)' }}
      />
    </section>
  );
}
