/**
 * Content for the "What we do" section, the /work portfolio and the smaller
 * pages. Portfolio thumbnails live in /public/work — a 1440×900 capture of each
 * site's landing view.
 */
export type Pillar = {
  title: string;
  description: string;
  items: string[];
  /** Looping background clip in /public/videos; a same-named .jpg is its poster. */
  video: string;
};

export const pillars: Pillar[] = [
  {
    title: 'Brand & Identity',
    description:
      'Naming, identity systems and brand worlds built to hold up across every surface.',
    items: ['Naming', 'Visual identity', 'Brand guidelines', 'Packaging & collateral'],
    video: '/videos/brand-identity',
  },
  {
    title: 'Digital Products',
    description:
      'Websites, apps and software designed around real user behaviour, not internal guesswork.',
    items: ['Websites', 'Web apps', 'Mobile apps', 'Software & platforms'],
    video: '/videos/digital-products',
  },
  {
    title: 'Campaigns & Advertising',
    description:
      'Concepts, films and campaigns built to earn attention, not just spend it.',
    items: ['Strategy & concepts', 'Film & content', 'Social & digital ads', 'OOH & print'],
    video: '/videos/campaigns',
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
  /** Category ids. A project can sit in more than one filter. */
  categories: string[];
  /** Path under /public. Falls back to a solid placeholder block when omitted. */
  image?: string;
};

export const categories: Category[] = [
  { id: 'websites', label: 'Websites' },
  { id: 'interactive-ui', label: 'Websites - Interactive UI' },
  { id: 'ecommerce', label: 'Ecommerce' },
  { id: 'custom-software', label: 'Custom Softwares / Web Application' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
];

export const projects: Project[] = [
  {
    slug: 'sella',
    title: 'Sella',
    summary: 'Furniture studio concept with a configurable 3D chair built in three.js.',
    url: 'https://sella.rendersarc.com/',
    categories: ['interactive-ui'],
    image: '/work/sella.png',
  },
  {
    slug: 'backwater',
    title: 'Backwater',
    summary: 'Kerala fish restaurant on the edge of Vembanad Lake, Kumarakom.',
    url: 'https://backwater.rendersarc.com/',
    categories: ['websites'],
    image: '/work/backwater.png',
  },
  {
    slug: 'kala-interiors',
    title: 'The Kala Interiors',
    summary: 'Interior design studio for residential, commercial and hospitality spaces.',
    url: 'https://www.thekalainteriors.com/',
    categories: ['websites'],
    image: '/work/kala-interiors.png',
  },
  {
    slug: 'roots-and-leaps',
    title: 'Roots & Leaps',
    summary: 'Global management consulting and advisory firm.',
    url: 'https://www.rootsandleaps.com/',
    categories: ['websites'],
    image: '/work/roots-and-leaps.png',
  },
  {
    slug: 'euphrates-asia',
    title: 'Euphrates Asia',
    summary: 'Brand equity and narrative advisory for founders and market leaders across Asia.',
    url: 'https://www.euphratesasia.com/',
    categories: ['websites'],
    image: '/work/euphrates-asia.png',
  },
  {
    slug: 'fetch-advertising',
    title: 'Fetch',
    summary: 'Influencer marketing platform connecting brands with creators.',
    url: 'https://fetchadvertising.tech/',
    categories: ['custom-software'],
    image: '/work/fetch-advertising.png',
  },
  {
    slug: 'travel-link-uae',
    title: 'Travel Link UAE',
    summary: 'Luxury chauffeur service in Dubai with a premium fleet and 24/7 booking.',
    url: 'https://travellinkuae.com/',
    categories: ['websites'],
    image: '/work/travel-link-uae.png',
  },
  {
    slug: 'wow-gel-nails',
    title: 'WOW Nails',
    summary: 'Online store for TPO-free gel nail polish, with a shade lab for browsing colours.',
    url: 'https://wowgelnails.com/',
    categories: ['ecommerce'],
    image: '/work/wow-gel-nails.png',
  },
  {
    slug: 'tit',
    title: 'TIT',
    summary: 'Bilingual Saudi store for smart TVs, home and kitchen appliances.',
    url: 'https://tit.com.sa/',
    categories: ['ecommerce'],
    image: '/work/tit.png',
  },
  {
    slug: 'areej-alarab',
    title: 'Areej Alarab',
    summary: 'Bilingual fragrance store carrying Arabian perfume houses and bakhoor.',
    url: 'https://areejalarab.online/',
    categories: ['ecommerce'],
    image: '/work/areej-alarab.png',
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Path under /public. Falls back to a silhouette when omitted. */
  avatar?: string;
};

const QUOTE =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit';

export const testimonials: Testimonial[] = [
  { id: 't1', quote: QUOTE, name: 'Lorem ipsum', role: 'Lorem ipsum' },
  { id: 't2', quote: QUOTE, name: 'Lorem ipsum', role: 'Lorem ipsum' },
  { id: 't3', quote: QUOTE, name: 'Lorem ipsum', role: 'Lorem ipsum' },
  { id: 't4', quote: QUOTE, name: 'Lorem ipsum', role: 'Lorem ipsum' },
  { id: 't5', quote: QUOTE, name: 'Lorem ipsum', role: 'Lorem ipsum' },
  { id: 't6', quote: QUOTE, name: 'Lorem ipsum', role: 'Lorem ipsum' },
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
      'We start with the people who will use the thing: what they need, where they drop off, and what the business needs back from them. Placeholder copy — replace with the real intake process.',
    deliverables: ['Stakeholder interviews', 'Audience map', 'Success metrics'],
  },
  {
    number: '02',
    title: 'Definition',
    description:
      'Scope, structure and priorities agreed before a single screen is designed, so the build never becomes a negotiation. Placeholder copy.',
    deliverables: ['Sitemap & flows', 'Scope document', 'Timeline'],
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Interface, identity and motion built as one system rather than a set of screens handed over in isolation. Placeholder copy.',
    deliverables: ['Design system', 'Key screens', 'Prototype'],
  },
  {
    number: '04',
    title: 'Build',
    description:
      'Production code with the design system as its source of truth, reviewed against the metrics set in discovery. Placeholder copy.',
    deliverables: ['Production build', 'CMS handover', 'QA pass'],
  },
  {
    number: '05',
    title: 'Launch & iterate',
    description:
      'Shipping is the midpoint. We watch how it performs and keep tuning against real behaviour. Placeholder copy.',
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
