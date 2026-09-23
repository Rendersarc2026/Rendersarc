'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

/**
 * True 5 — the signature opener for every Renders Arc project.
 *
 * The dot grid is the whole argument made visible: 100 dots stand for the real
 * problems hiding in a design, and each conversation lights up the share it
 * uncovers. Figures follow Nielsen Norman Group's research on test-user counts.
 */

/** Approximate share of a design's real problems found after n conversations. */
const COUNTS = [0, 31, 52, 65, 77, 85];

const READOUTS = [
  {
    title: 'Before we talk to anyone',
    body: 'Where most projects start: a meeting, an opinion and a guess. Step through the five conversations to see what changes.',
  },
  {
    title: 'One conversation',
    body: 'The first person on their own surfaces about a third of the real problems in a design.',
  },
  {
    title: 'Two conversations',
    body: 'Some of what the first person said comes up again. We can now tell a pattern from one person’s habit.',
  },
  {
    title: 'Three conversations',
    body: 'Three people surface roughly two thirds. The shape of the real problems is clear.',
  },
  {
    title: 'Four conversations',
    body: 'The list grows more slowly now, and much of what we hear sounds familiar.',
  },
  {
    title: 'Five conversations',
    body: 'Five reaches roughly 85%. A sixth would mostly repeat what we already know, so this is where we stop guessing and start building.',
  },
];

const TIMELINE = [
  { title: 'Scope agreed', note: 'We know what we are making and why.' },
  { title: 'True 5', note: 'Five conversations with real users.', here: true },
  { title: 'The brief', note: 'What we heard becomes the brief.' },
  { title: 'Design', note: 'The first file opens here.' },
];

const QUESTIONS = [
  'What do you do today without this?',
  'Where would you get stuck?',
  'What words would you actually use?',
  'What would make you trust this enough to act?',
];

/** Deterministic shuffle so the found problems scatter instead of filling row by row. */
function buildRanks() {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const order = Array.from({ length: 100 }, (_, i) => i);
  for (let i = 99; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const ranks = new Array<number>(100);
  order.forEach((dot, r) => {
    ranks[dot] = r;
  });
  return ranks;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
} as const;

export function TrueFive() {
  const reduce = useReducedMotion();
  const ranks = useMemo(buildRanks, []);

  const [step, setStep] = useState(5);
  const [pct, setPct] = useState(COUNTS[5]);
  const pctRef = useRef(COUNTS[5]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.4 });

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    stop();
    setStep(0);
    let n = 0;
    timerRef.current = setInterval(() => {
      n += 1;
      setStep(n);
      if (n >= 5) stop();
    }, 1400);
  }, [stop]);

  // One orchestrated moment: the five conversations play once as the stage arrives.
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(5);
      return;
    }
    play();
    return stop;
  }, [inView, reduce, play, stop]);

  useEffect(() => () => stop(), [stop]);

  // Tween the headline number so it counts rather than jumps.
  useEffect(() => {
    const target = COUNTS[step];
    if (reduce) {
      pctRef.current = target;
      setPct(target);
      return;
    }
    const from = pctRef.current;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 700, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(from + (target - from) * eased);
      pctRef.current = value;
      setPct(value);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [step, reduce]);

  const select = (n: number) => {
    stop();
    setStep(n);
  };

  const now = COUNTS[step];
  const prev = COUNTS[Math.max(step - 1, 0)];

  return (
    <section
      id="true-5"
      className="bg-white text-black selection:bg-[#00ea77]/30 overflow-hidden"
    >
      {/* ---------------- Opening ---------------- */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <motion.div {...fadeUp} className="max-w-[1400px] mx-auto relative">
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <div className="h-px w-10 bg-[#00ea77]" />
            <span className="text-[#00995a] text-xs tracking-widest uppercase font-bold">
              True 5
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.08] font-[700] tracking-tight max-w-[18ch]">
            We talk to five real users before we{' '}
            <span className="text-[#00995a]">design anything</span>.
          </h2>

          <div className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-10 lg:gap-20 items-start">
            <p className="text-lg md:text-xl text-black/65 font-[400] leading-relaxed max-w-[46ch]">
              True 5 is how every Renders Arc website, app and piece of software begins.
              Before a design file opens, we sit down one-on-one with five people who match
              the actual end user, and what they say shapes the brief.
            </p>
            <p className="text-2xl md:text-3xl font-[700] tracking-tight leading-[1.25] lg:pt-1">
              <span className="text-black/35">Not a survey. Not a focus group.</span>{' '}
              <span className="text-black">Five separate conversations.</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ---------------- Why five: the dot stage ---------------- */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 md:py-24 border-t border-black/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h3 className="text-2xl md:text-4xl font-[700] tracking-tight leading-tight max-w-[20ch]">
              Five is where we have heard enough to act.
            </h3>
            <p className="mt-6 text-base md:text-lg text-black/55 font-[400] leading-relaxed max-w-[52ch]">
              Every design carries a hidden set of real problems. Each conversation uncovers
              some of them. Step through the five and watch what the first person finds, then
              what the fifth adds.
            </p>
          </motion.div>

          <div
            ref={stageRef}
            className="mt-14 md:mt-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 lg:gap-24 items-start"
          >
            {/* Dots */}
            <div className="w-full max-w-[460px]">
              <div
                className="grid grid-cols-10 gap-[5px] sm:gap-2"
                role="img"
                aria-label="One hundred dots. Each lit dot is a real problem in the design that we have found."
              >
                {ranks.map((rank, i) => {
                  const found = rank < now;
                  const isNew = step > 0 && rank >= prev && rank < now;
                  return (
                    <span
                      key={i}
                      style={{
                        transitionDelay: !reduce && isNew ? `${(rank - prev) * 14}ms` : '0ms',
                      }}
                      className={[
                        'aspect-square rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-500',
                        isNew
                          ? 'bg-[#00ea77] border-[#00ea77] shadow-[0_0_14px_rgba(0,234,119,0.6)] scale-110'
                          : found
                            ? 'bg-black border-black'
                            : 'bg-transparent border-black/15',
                      ].join(' ')}
                    />
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-black/50 font-[400]">
                <span className="inline-flex items-center gap-2">
                  <i className="w-2.5 h-2.5 rounded-full border border-black/15" />
                  Not yet heard
                </span>
                <span className="inline-flex items-center gap-2">
                  <i className="w-2.5 h-2.5 rounded-full bg-black border border-black" />
                  Already heard
                </span>
                <span className="inline-flex items-center gap-2">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#00ea77] border border-[#00ea77]" />
                  Found in this conversation
                </span>
              </div>
            </div>

            {/* Readout */}
            <div>
              <div aria-live="polite">
                <div className="text-[clamp(4.5rem,13vw,10rem)] leading-[0.85] font-[700] tracking-tighter tabular-nums text-black">
                  {pct}
                  <span className="text-[#00995a]">%</span>
                </div>
                <p className="mt-5 text-sm md:text-base text-black/50 font-[400]">
                  of the design’s real problems found
                </p>
              </div>

              <div
                className="mt-10 flex flex-wrap items-center gap-3"
                role="group"
                aria-label="Choose how many conversations we have had"
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = step === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => select(n)}
                      aria-pressed={active}
                      aria-label={`After conversation ${n}`}
                      className={[
                        'w-12 h-12 rounded-full border text-sm font-[400] transition-all duration-300',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea77] focus-visible:ring-offset-2',
                        active
                          ? 'bg-black border-black text-white'
                          : 'bg-white border-black/15 text-black/60 hover:border-[#00ea77] hover:text-[#00995a] hover:shadow-[0_0_20px_rgba(0,234,119,0.18)]',
                      ].join(' ')}
                    >
                      {n}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => (reduce ? select(5) : play())}
                  className="ml-2 px-2 py-2 text-sm font-[400] text-black/45 hover:text-[#00995a] underline underline-offset-4 decoration-black/20 hover:decoration-[#00ea77] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ea77] focus-visible:ring-offset-2 rounded"
                >
                  Replay
                </button>
              </div>

              <div className="mt-10 min-h-[9.5rem] max-w-[38ch]" aria-live="polite">
                <h4 className="text-xl md:text-2xl font-[700] tracking-tight text-black">
                  {READOUTS[step].title}
                </h4>
                <p className="mt-3 text-base md:text-lg text-black/60 font-[400] leading-relaxed">
                  {READOUTS[step].body}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-12 md:mt-16 text-[13px] text-black/40 font-[400] max-w-[62ch] leading-relaxed">
            Figures are approximate and follow Nielsen Norman Group’s usability research on how
            many test users a design needs.{' '}
            <a
              href="https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-[#00995a] underline underline-offset-4 decoration-black/20 hover:decoration-[#00ea77] transition-colors"
            >
              Read the research
            </a>
            .
          </p>
        </div>
      </div>

      {/* ---------------- Why "True" ---------------- */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 md:py-24 border-t border-black/10">
        <motion.div {...fadeUp} className="max-w-[1400px] mx-auto">
          <h3 className="text-2xl md:text-4xl font-[700] tracking-tight leading-tight">
            Why it is called <span className="text-[#00995a]">True</span>.
          </h3>
          <p className="mt-6 text-base md:text-lg text-black/55 font-[400] leading-relaxed max-w-[52ch]">
            Five people who are easy to reach are not the same as five people who will use the
            product. The name works as a filter on who we invite.
          </p>

          <div className="mt-12 md:mt-16 grid md:grid-cols-2 border-t border-black">
            <div className="pt-8 md:pr-12 pb-8 md:pb-0">
              <h4 className="text-xl md:text-2xl font-[700] tracking-tight text-black/35 line-through decoration-1">
                Convenient five
              </h4>
              <ul className="mt-6">
                {['A founder’s friends', 'Whoever is in the office', 'Whoever is easiest to reach'].map(
                  (item) => (
                    <li
                      key={item}
                      className="py-4 border-b border-black/10 text-base md:text-lg font-[400] text-black/40"
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="pt-8 md:pl-12 border-t md:border-t-0 md:border-l border-black/10">
              <h4 className="text-xl md:text-2xl font-[700] tracking-tight text-black">
                True five
              </h4>
              <ul className="mt-6">
                {[
                  'People who match the actual end user',
                  'People who would genuinely open the thing',
                  'Five separate, one-on-one conversations',
                ].map((item) => (
                  <li
                    key={item}
                    className="py-4 border-b border-black/10 text-base md:text-lg font-[400] text-black/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------------- What it replaces ---------------- */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 md:py-24 border-t border-black/10">
        <motion.div {...fadeUp} className="max-w-[1400px] mx-auto">
          <h3 className="text-2xl md:text-4xl font-[700] tracking-tight leading-tight max-w-[22ch]">
            Assumptions in a meeting, replaced by people.
          </h3>
          <p className="mt-6 text-base md:text-lg text-black/55 font-[400] leading-relaxed max-w-[52ch]">
            Most studios let the design take shape from whatever is loudest in the room.
          </p>

          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-10 md:gap-24 items-start">
            <ul className="border-t border-black/10">
              {[
                'The client’s opinion',
                'The founder’s gut',
                'A competitor’s screenshot',
                'Whoever is loudest in the room',
              ].map((item) => (
                <li
                  key={item}
                  className="py-5 border-b border-black/10 text-xl md:text-[2rem] leading-tight font-[700] tracking-tight text-black/30 line-through decoration-1"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="md:pt-5">
              <span className="block mb-4 text-xs uppercase tracking-widest text-[#00995a] font-bold">
                At Renders Arc, it starts with
              </span>
              <p className="text-xl md:text-[2rem] leading-tight font-[700] tracking-tight text-black">
                Five conversations with the people who will actually open the thing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------------- Where it sits ---------------- */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 md:py-24 border-t border-black/10">
        <motion.div {...fadeUp} className="max-w-[1400px] mx-auto">
          <h3 className="text-2xl md:text-4xl font-[700] tracking-tight leading-tight">
            Design starts after, not before.
          </h3>
          <p className="mt-6 text-base md:text-lg text-black/55 font-[400] leading-relaxed max-w-[52ch]">
            True 5 happens at the very start of a project, once the scope is agreed and before
            any design file opens.
          </p>

          <ol className="mt-14 md:mt-20 grid md:grid-cols-4 md:border-t border-black max-md:border-l max-md:ml-1.5">
            {TIMELINE.map((item) => (
              <li
                key={item.title}
                className="relative max-md:pl-8 max-md:pb-8 md:pt-8 md:pr-8 last:pb-0"
              >
                <span
                  className={[
                    'absolute rounded-full',
                    'max-md:left-[-7px] max-md:top-1.5 md:left-0',
                    item.here
                      ? 'w-3.5 h-3.5 bg-[#00ea77] border border-[#00ea77] shadow-[0_0_16px_rgba(0,234,119,0.55)] md:-top-[7px]'
                      : 'w-3 h-3 bg-white border border-black md:-top-1.5',
                  ].join(' ')}
                />
                <b
                  className={[
                    'block text-lg md:text-xl font-[700] tracking-tight',
                    item.here ? 'text-[#00995a]' : 'text-black',
                  ].join(' ')}
                >
                  {item.title}
                </b>
                <small className="block mt-1.5 text-sm text-black/45 font-[400] leading-relaxed">
                  {item.note}
                </small>
              </li>
            ))}
          </ol>

          <div className="mt-16 md:mt-24 grid md:grid-cols-2 border-t border-black/10">
            {QUESTIONS.map((q, i) => (
              <p
                key={q}
                className={[
                  'py-7 text-xl md:text-2xl lg:text-[1.75rem] leading-tight font-[700] tracking-tight text-black/80 border-b border-black/10',
                  i % 2 === 1 ? 'md:pl-10 md:border-l md:border-black/10' : 'md:pr-10',
                ].join(' ')}
              >
                {q}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-black/40 font-[400]">
            The questions we bring to every conversation.
          </p>
        </motion.div>
      </div>

      {/* ---------------- Close ---------------- */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 md:py-32 border-t border-black/10 relative">
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#00ea77]/[0.05] blur-[150px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        <motion.div {...fadeUp} className="max-w-[1400px] mx-auto relative">
          <p className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-[700] tracking-tight max-w-[19ch]">
            Five conversations get you to roughly{' '}
            <span className="text-[#00995a]">85%</span> of the problems a design will actually
            have, so that is where we stop guessing and start building.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center mt-12 px-8 py-4 bg-[#fafafa] border border-black/10 hover:border-[#00ea77] rounded-full text-black hover:text-[#00995a] transition-all duration-300 font-medium tracking-wide hover:shadow-[0_0_30px_rgba(0,234,119,0.2)]"
          >
            Start a project with True 5
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
