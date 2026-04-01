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
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';

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
    <section id="industries" className="bg-black relative pt-[10vh] pb-[5vh] md:pb-[10vh]">
      {/* Normal Title Flow */}
      <div className="w-full z-10 pointer-events-none mb-[4vh] md:mb-[15vh]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-6 md:w-10 bg-[#00ea77]" />
            <span className="text-[#00ea77] text-xs md:text-sm tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(0,234,119,0.5)]">
              Industries We Transform
            </span>
            <div className="h-px w-6 md:w-10 bg-[#00ea77]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white leading-tight drop-shadow-xl">
            Empowering growth <br className="hidden md:block" />
            <span className="text-white/60">
              across <span className="text-[#00ea77] font-light drop-shadow-[0_0_15px_rgba(0,234,119,0.4)]">every sector</span>
            </span>
          </h2>
        </div>
      </div>

      <ScrollStack
        className="w-full bg-black relative z-0 px-4 md:px-0"
        itemDistance={50}
        itemStackDistance={0}
        itemScale={0.06}
        incomingScale={1}
        baseScale={1}
        scaleEndPosition="10%"
        stackPosition="15%"
        useWindowScroll={true}
      >
        {industries.map((ind, i) => (
          <ScrollStackItem
            key={i}
            itemClassName="group md:min-h-[480px] w-full max-w-5xl mx-auto !bg-[#0a0a0a] border border-white/5 hover:border-[#00ea77]/40 transition-colors duration-500 overflow-hidden !p-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ea77]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ea77]/0 via-[#00ea77]/50 to-[#00ea77]/0 opacity-0 group-hover:opacity-100 transition-all duration-700" />

            <div className="relative z-10 flex flex-col gap-4 md:gap-8 w-full p-6 md:p-16">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-[#00ea77]/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex-shrink-0">
                  {ind.icon && <ind.icon className="w-5 h-5 md:w-7 md:h-7 text-[#00ea77]" />}
                </div>
                <h3 className="text-xl md:text-4xl font-bold text-white group-hover:text-[#00ea77] transition-colors duration-300">
                  {ind.title}
                </h3>
              </div>

              <div className="mb-2">
                <p className="text-lg md:text-2xl font-medium text-white/90 leading-snug group-hover:text-white transition-colors duration-300">
                  {ind.subtitle}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-medium">
                  {ind.desc1}
                </p>
                <p className="text-base md:text-lg text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {ind.desc2}
                </p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
