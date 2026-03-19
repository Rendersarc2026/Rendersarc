import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect } from 'react';

function AnimatedNumber({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay: 0.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, value]);

  return (
    <div className="text-center relative">
      <div className="text-4xl md:text-5xl tracking-tight mb-2 font-light" style={{ color: '#FFFFFF' }}>
        <motion.span>{rounded}</motion.span>
      </div>
      <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </div>
    </div>
  );
}

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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center mt-12 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="inline-flex items-center gap-3 mb-10"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '999px',
            padding: '8px 20px',
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        >
          <motion.span 
            className="w-1.5 h-1.5 rounded-full" 
            style={{ backgroundColor: '#FFFFFF' }} 
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span style={{ color: 'rgba(255,255,255,0.6)' }} className="text-xs tracking-widest uppercase">
            Premium Design &amp; Digital Agency
          </span>
        </motion.div>

        <div className="mb-8 space-y-2 perspective-1000" style={{ perspective: 1000 }}>
          <div className="flex justify-center flex-wrap gap-x-6 pb-2 relative">
            {/* Floating Badge 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ duration: 0.7, delay: 1.1, type: "spring", bounce: 0.5 }}
              className="absolute -top-4 left-[15%] md:left-[25%] z-20"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest uppercase font-bold shadow-xl"
                style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
              >
                Innovative
              </motion.div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-[4.5rem] md:text-8xl lg:text-[110px] leading-none tracking-tight origin-bottom font-bold" 
              style={{ color: '#FFFFFF' }}
            >
              Designing
            </motion.h1>
          </div>

          <div className="flex justify-center flex-wrap gap-x-5 pb-4 relative">
            {/* Floating Badge 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ duration: 0.7, delay: 1.3, type: "spring", bounce: 0.5 }}
              className="absolute -bottom-2 right-[10%] md:right-[20%] z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest uppercase font-bold shadow-xl"
                style={{ backgroundColor: '#C9A84C', color: '#000000' }}
              >
                Award-Winning
              </motion.div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-[4.5rem] md:text-8xl lg:text-[110px] leading-none tracking-tight origin-bottom font-bold" 
              style={{ color: '#FFFFFF' }}
            >
              Digital
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-[4.5rem] md:text-8xl lg:text-[110px] leading-none tracking-tight origin-bottom italic font-serif" 
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              futures
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
          className="mx-auto mb-10 origin-center"
          style={{ width: '80px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          We craft purposeful digital experiences — from strategy and branding
          to web design and marketing — built to elevate your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full transition-all font-semibold"
            style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E5E5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF'; }}
          >
            <span className="text-sm tracking-widest uppercase">Start a project</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm tracking-widest uppercase transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)'; }}
          >
            Our services
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="mt-28 flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-24"
        >
          <AnimatedNumber value={120} label="Projects delivered" suffix="+" />
          
          <div className="hidden sm:block w-px h-12" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
          
          <AnimatedNumber value={8} label="Industry experience" suffix=" yrs" />
          
          <div className="hidden sm:block w-px h-12" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
          
          <AnimatedNumber value={98} label="Client satisfaction" suffix="%" />
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #000000)' }}
      />
    </section>
  );
}
