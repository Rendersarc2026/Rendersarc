/**
 * Content for the "What we do" and "What we build, specifically" sections.
 * Copy and imagery are placeholders — replace the strings and add `image`
 * paths (anything under /public) as real work comes in.
 */

export type Pillar = {
  title: string;
  description: string;
  items: string[];
};

export type Category = {
  id: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Must match a Category id */
  category: string;
  summary: string;
  approach: string;
  /** Path under /public. Falls back to a solid placeholder block when omitted. */
  image?: string;
};

const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.';

export const pillars: Pillar[] = [
  {
    title: 'Brand & Identity',
    description:
      'Naming, identity systems and brand worlds built to hold up across every surface.',
    items: ['Naming', 'Visual identity', 'Brand guidelines', 'Packaging & collateral'],
  },
  {
    title: 'Digital Products',
    description:
      'Websites, apps and software designed around real user behaviour, not internal guesswork.',
    items: ['Websites', 'Web apps', 'Mobile apps', 'Software & platforms'],
  },
  {
    title: 'Campaigns & Advertising',
    description:
      'Concepts, films and campaigns built to earn attention, not just spend it.',
    items: ['Strategy & concepts', 'Film & content', 'Social & digital ads', 'OOH & print'],
  },
];

export const categories: Category[] = [
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'marketing', label: 'Marketing & Brand Websites' },
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
  { id: 'software', label: 'Software & Platforms' },
];

export const projects: Project[] = [
  {
    slug: 'al-reeb-shopify',
    title: 'Al Reeb Shopify Page',
    category: 'ecommerce',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'storefront-replatform',
    title: 'Storefront Replatform',
    category: 'ecommerce',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'brand-site-refresh',
    title: 'Brand Site Refresh',
    category: 'marketing',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'campaign-microsite',
    title: 'Campaign Microsite',
    category: 'marketing',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'operations-dashboard',
    title: 'Operations Dashboard',
    category: 'web-apps',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'booking-portal',
    title: 'Booking Portal',
    category: 'web-apps',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'field-service-app',
    title: 'Field Service App',
    category: 'mobile-apps',
    summary: LOREM,
    approach: LOREM,
  },
  {
    slug: 'inventory-platform',
    title: 'Inventory Platform',
    category: 'software',
    summary: LOREM,
    approach: LOREM,
  },
];

export const projectsByCategory = (categoryId: string) =>
  projects.filter((p) => p.category === categoryId);

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
