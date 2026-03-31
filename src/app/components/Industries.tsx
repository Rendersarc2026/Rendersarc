'use client';

import {
  Building2,
  ShoppingBag,
  Factory,
  Stethoscope,
  GraduationCap,
  Utensils,
  Rocket,
  Building
} from 'lucide-react';
import { motion } from 'motion/react';

const industries = [
  {
    icon: Building2,
    title: 'Real Estate',
    subtitle: 'You Don’t Need More Leads. You Need Better Closures.',
    desc1: 'Most deals are lost after enquiry — not before.',
    desc2: 'We build systems that track leads, automate follow-ups, and convert interest into site visits and bookings.',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    subtitle: 'Your Profit Is Hidden in What You’re Losing.',
    desc1: 'High traffic means nothing if users drop off.',
    desc2: 'We optimize the journey from product view to checkout — reducing abandonment and increasing order value.',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    subtitle: 'Your Problem Isn’t Production. It’s Visibility.',
    desc1: 'Delays happen when systems don’t talk.',
    desc2: 'We create real-time dashboards and automation that bring clarity to operations and inventory.',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    subtitle: 'Better Systems = Better Patient Experience.',
    desc1: 'Patients remember the process, not just the treatment.',
    desc2: 'We streamline appointments, reduce wait times, and simplify patient management.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'Content Doesn’t Scale. Systems Do.',
    desc1: 'Courses alone don’t build businesses.',
    desc2: 'We build platforms that improve engagement, track progress, and increase completion rates.',
  },
  {
    icon: Utensils,
    title: 'Restaurants',
    subtitle: 'Speed Is Revenue. Experience Is Retention.',
    desc1: 'Every delay costs you customers.',
    desc2: 'We design systems that accelerate ordering, optimize operations, and increase repeat visits.',
  },
  {
    icon: Rocket,
    title: 'Startups',
    subtitle: 'Build What Matters First.',
    desc1: 'Most startups fail by building too much, too early.',
    desc2: 'We help you launch fast with the right features and scale with confidence.',
  },
  {
    icon: Building,
    title: 'Enterprises',
    subtitle: 'Growth Needs Structure. Not More Tools.',
    desc1: 'As teams grow, complexity increases.',
    desc2: 'We build systems that align operations, centralize data, and improve decision-making.',
  },
];

export function Industries() {
  return (
    <section id="industries" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-[5%] w-[500px] h-[500px] bg-[#00ea77]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-[#00ea77]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <div className="h-px w-10 bg-[#00ea77]" />
            <span className="text-[#00ea77] text-xs tracking-widest uppercase font-semibold drop-shadow-[0_0_8px_rgba(0,234,119,0.5)]">
              Industries We Transform
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl leading-tight font-bold text-white max-w-3xl">
            Empowering growth across{' '}
            <span className="text-[#00ea77] drop-shadow-[0_0_15px_rgba(0,234,119,0.4)]">
              every sector
            </span>
          </h2>
        </motion.div>

        <div className="relative w-full overflow-hidden pb-10">
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 12px)); }
            }
            .animate-scroll {
              animation: scroll 40s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Left/Right Fade Elements for smooth fade-in/fade-out */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          <div className="flex animate-scroll gap-6 w-max items-stretch">
            {[...industries, ...industries].map((ind, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[420px] min-h-[400px] flex-shrink-0 group flex flex-col p-8 rounded-2xl cursor-pointer gap-6 transition-all relative overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-[#00ea77]/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ea77]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ea77]/0 via-[#00ea77]/0 to-[#00ea77]/0 group-hover:from-[#00ea77]/0 group-hover:via-[#00ea77]/50 group-hover:to-[#00ea77]/0 transition-all duration-700" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-[#00ea77]/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      {ind.icon && <ind.icon size={24} className="text-[#00ea77]" />}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00ea77] transition-colors duration-300">
                      {ind.title}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-base font-semibold text-white/90 leading-snug group-hover:text-white transition-colors duration-300">
                      {ind.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <p className="text-sm text-white/50 leading-relaxed font-medium">
                      {ind.desc1}
                    </p>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                      {ind.desc2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
