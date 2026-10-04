/**
 * Content for the "What we do" section and the smaller pages. The portfolio
 * itself lives in the Supabase `projects` table (see ./projects.ts), with its
 * images in the Storage bucket — a 1440×900 capture of each site's landing view
 * for the card.
 */
export type Pillar = {
  title: string;
  description: string;
  /** Longer copy shown under the video card. */
  body: string;
  items: string[];
  /** Looping background clip's key in the Storage bucket, without extension; a same-named .jpg is its poster. */
  video: string;
};

export const pillars: Pillar[] = [
  {
    title: 'Brand & Identity',
    description:
      'Naming, identity systems and brand worlds built to hold up across every surface.',
    body:
      'We start with what the business stands for and work outward: a name that travels, a mark that scales from favicon to billboard, and a system of type, colour and tone that teams can actually use. Every identity ships with guidelines and production-ready assets, so the brand stays consistent long after launch.',
    items: ['Naming', 'Visual identity', 'Brand guidelines', 'Packaging & collateral'],
    video: 'videos/brand-identity',
  },
  {
    title: 'Digital Products',
    description:
      'Websites, apps and software designed around real user behaviour, not internal guesswork.',
    body:
      'From marketing sites to full platforms, we take products from research and wireframes through interface design and engineering. We build on modern, maintainable stacks, test with real users along the way, and stay on after launch to measure, iterate and keep things fast.',
    items: ['Websites', 'Web apps', 'Mobile apps', 'Software & platforms'],
    video: 'videos/digital-products',
  },
  {
    title: 'Campaigns & Advertising',
    description:
      'Concepts, films and campaigns built to earn attention, not just spend it.',
    body:
      'We find the idea worth saying, then make it work everywhere it needs to live — film, social, digital and print. Strategy, creative and production sit under one roof, so campaigns move from concept to rollout quickly and every asset reads as part of the same story.',
    items: ['Strategy & concepts', 'Film & content', 'Social & digital ads', 'OOH & print'],
    video: 'videos/campaigns',
  },
];

export type Category = {
  id: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line on who the client is and what the site does. */
  summary: string;
  /** Live site the card opens. */
  url: string;
  /** Leave the "Visit site" button off the case study, e.g. for a login-only platform. */
  hideSiteLink?: boolean;
  /** Category ids. A project can sit in more than one filter. */
  categories: string[];
  /** Image URL. Falls back to a solid placeholder block when omitted. */
  image?: string;
  /** Up to three landscape (16:10) desktop shot URLs for the row under the case study hero, or up to five phone screens when `apps` is set. Empty slots show a plain block. */
  gallery?: string[];
  /** Store listings for a mobile app project. Its gallery then shows phone screens. */
  apps?: AppListing[];
  /** The project's own write-up. Without one the case study page shows placeholder copy. */
  caseStudy?: CaseStudyContent;
};

export type AppListing = {
  /** Which app, e.g. "Customer app". */
  name: string;
  appStore?: string;
  googlePlay?: string;
};

export const categories: Category[] = [
  { id: 'websites', label: 'Websites' },
  { id: 'interactive-ui', label: 'Websites - Interactive UI' },
  { id: 'ecommerce', label: 'Ecommerce' },
  { id: 'custom-software', label: 'Custom Softwares / Web Application' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
];

export type CaseStudyContent = {
  year?: string;
  /** 16:9 hero shot URL, e.g. a device mockup. Defaults to the 16:10 card screenshot. */
  cover?: string;
  problem: string;
  approach: string;
  /** "What we changed" — short titled points. */
  changes?: { title: string; body: string }[];
  /** Closing statement; `emphasis` follows `text` and is set in bold. */
  result: { text: string; emphasis?: string };
  /** Headline numbers. The results strip is hidden without them. */
  stats?: { value: string; label: string }[];
};

export type CaseStudy = CaseStudyContent & { services: string[] };

/**
 * Case study for a project: its own `caseStudy` content when it has one,
 * otherwise the same dummy copy for every project with its name dropped in.
 */
export function caseStudyFor(project: Project): CaseStudy {
  const services = [
    ...project.categories.map((id) => categories.find((c) => c.id === id)?.label ?? id),
    'UI/UX design',
    'Development',
  ];

  if (project.caseStudy) return { ...project.caseStudy, services };

  return {
    year: '2025',
    services,
    problem: `${project.title} needed a site that did justice to the business behind it. The previous presence was dated, hard to update and did little to turn visitors into enquiries.`,
    approach: `We started with the people who would actually use it, mapped what they came looking for, and built the structure around those journeys before a single screen was designed. Identity, interface and motion were developed as one system, then built out with a CMS the ${project.title.replace(/^the\s+/i, '')} team can run themselves.`,
    result: {
      text: `The new site launched on schedule and gives ${project.title} a presence that matches the quality of the work — faster, clearer and easier to keep current.`,
    },
    stats: [
      { value: '2×', label: 'More enquiries' },
      { value: '40%', label: 'Faster load time' },
      { value: '6 wks', label: 'Kickoff to launch' },
    ],
  };
}

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Path under /public. Falls back to a silhouette when omitted. */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  { 
    id: 't2', 
    quote: "Working on the Fetch project with them was a seamless experience. They understood our requirements perfectly and built a highly performant and intuitive application. Their technical expertise and design sensibilities are top-notch.", 
    name: 'Dilkush', 
    role: 'Fetch'
  },
  { 
    id: 't3', 
    quote: "They transformed our digital infrastructure across both Tigris and Euphrates Asia. Their strategic approach to our complex multi-brand architecture gave us a unified, scalable solution that looks incredible and performs flawlessly.", 
    name: 'Ajnas', 
    role: 'Tigris Asia & Euphrates Asia'
  },
  { 
    id: 't1', 
    quote: "The team delivered exceptional work for Kala Interiors. Their attention to detail and ability to translate our vision into a stunning digital experience was truly impressive. The new platform has completely elevated our brand presence.", 
    name: 'Rehiyan', 
    role: 'Kala Interiors'
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  /** What the client actually receives at the end of the step. */
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start with the people who will use the thing: what they need, where they drop off, and what the business needs back from them.',
    deliverables: ['Stakeholder interviews', 'Audience map', 'Success metrics'],
  },
  {
    number: '02',
    title: 'Definition',
    description:
      'Scope, structure and priorities agreed before a single screen is designed, so the build never becomes a negotiation.',
    deliverables: ['Sitemap & flows', 'Scope document', 'Timeline'],
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Interface, identity and motion built as one system rather than a set of screens handed over in isolation.',
    deliverables: ['Design system', 'Key screens', 'Prototype'],
  },
  {
    number: '04',
    title: 'Build',
    description:
      'Production code with the design system as its source of truth, reviewed against the metrics set in discovery.',
    deliverables: ['Production build', 'CMS handover', 'QA pass'],
  },
  {
    number: '05',
    title: 'Launch & iterate',
    description:
      'Shipping is the midpoint. We watch how it performs and keep tuning against real behaviour.',
    deliverables: ['Launch plan', 'Analytics setup', 'Iteration cycle'],
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: 'How much does a website cost?',
    answer:
      'Pricing depends on scope, page count, and what your project needs. Web design projects start at $5,000. After a short conversation about your goals, you get a clear quote with defined costs.',
  },
  {
    question: 'How long does it take to build a site?',
    answer:
      "Timelines depend on scope and when you get us content and feedback throughout the project. Most full website projects run anywhere from 2 - 8 weeks or more from start to launch. You get a schedule with clear milestones at kickoff, and we'll set specific limits for each phase so nothing falls behind.",
  },
  {
    question: "Do I own my website once it's finished?",
    answer:
      'Yes. Once the project is complete and paid, the site and its files are yours. You keep full ownership of your domain, content, and design.',
  },
  {
    question: 'Who provides the content and images?',
    answer:
      'Strong content shapes strong design, so the words and photos usually come from you. We give you clear structure and direction for each area so every section works toward the action you want visitors to take.',
  },
  {
    question: 'Will I be able to update the site myself after launch?',
    answer:
      'Yes. Your site is built so you can handle everyday edits yourself, no code required. You get a short walkthrough at launch, and we stay available for larger updates whenever you want them.',
  },
  {
    question: 'How many rounds of revisions are included?',
    answer:
      'Each project includes set review points with room for feedback at every phase. The number of revision rounds is defined in your proposal up front, so the scope stays clear from start to finish.',
  },
  {
    question: 'What do you offer besides web design?',
    answer:
      'Brand and identity, digital products, and campaign work — the same team that designs the site can build the system around it. If a project needs something we do not do in-house, we tell you early rather than stretching to cover it.',
  },
  {
    question: 'How does a project begin?',
    answer:
      'With a short conversation to agree the scope, then True 5: five one-on-one conversations with people who match your actual end user. What they say becomes the brief, and the first design file opens after that, not before.',
  },
  {
    question: 'Will my site work well on phones?',
    answer:
      'Yes. Every build is designed for small screens as seriously as large ones, then checked across devices and browsers before launch, so layout, tap targets and load speed hold up in a hand as well as on a desk.',
  },
  {
    question: 'Will my site be found on Google?',
    answer:
      'Each Renders Arc website is built with clean structure and search-friendly technical foundations so it can be found and indexed. For ongoing ranking growth, we can point you toward focused search support via our network of SEO experts.',
  },
];
