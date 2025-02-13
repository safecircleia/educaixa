// links.ts
export const navItems = [
  {
    title: 'Platform',
    icon: 'Shield',
    items: [
      { 
        label: 'Core Features',
        subitems: [
          { label: 'How it Works', href: 'section-how-it-works' },
          { label: 'AI Technology', href: 'section-ai' },
        ]
      },
      {
        label: 'Security',
        subitems: [
          { label: 'Privacy', href: 'section-privacy' },
          { label: 'Protection', href: 'section-protection' },
        ]
      },
      { label: 'Features', href: 'section-features' },
    ]
  },
  {
    title: 'Develop',
    icon: 'Code',
    items: [
      { label: 'Docs', href: 'docs.safecircle.tech', external: true },
      { label: 'API', href: '/api', external: true },
      { label: 'GitHub', href: 'https://github.com/safecircleia', external: true },
    ]
  },
  {
    title: 'Community',
    icon: 'Users',
    items: [
      { label: 'Discord', href: 'https://discord.gg/Ubr6AcAupr', external: true },
      { label: 'Forum', href: '/forum' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  {
    title: 'Token',
    icon: 'Coins',
    items: [
      { label: 'Tokenomics', href: '#token' },
      { label: 'Governance', href: '/governance' },
      { label: 'Staking', href: '/staking' },
    ]
  }
];
