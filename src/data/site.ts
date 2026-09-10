export const site = {
  name: 'Hunter Dorfner',
  url: 'https://hunterdorfner.com',
  email: 'contact@hunterdorfner.com',
  linkedin: 'https://www.linkedin.com/in/hunter-dorfner',
  // Add a reviewed PDF to public/resume/ and set this to its root-relative URL.
  resume: null as string | null,
};
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Lab', href: '/lab/' },
  { label: 'Resume', href: '/resume/' },
];
export const skills = [
  {
    title: 'Analytics & reporting',
    tools: 'Excel · Power Query · Power BI · Tableau · SQL',
    context: 'From recurring reports to decisions people can act on.',
    href: '/projects/fleet-idle-reduction/',
    link: 'See the idle reduction case study',
  },
  {
    title: 'Code & development',
    tools: 'Python · Java · R · Git · GitHub · Astro · HTML · CSS · JavaScript',
    context: 'A growing toolkit for building, testing, and understanding systems.',
    href: '/projects/hunterdorfner-com/',
    link: 'Explore this website’s architecture',
  },
  {
    title: 'Transportation systems',
    tools: 'MercuryGate · FourKites · 24TRACC',
    context: 'Practical experience coordinating transportation and following work through.',
    href: '/experience/',
    link: 'Read about my experience',
  },
];
