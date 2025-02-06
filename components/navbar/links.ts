// links.ts
export const navItems = [
  {
    title: 'Platform',
    icon: 'Shield', // Use the same icon key, import and map in the navbar if needed
    items: [
      { label: 'How it Works', href: 'section-how-it-works' },
      { label: 'AI Technology', href: 'section-ai' },
      { label: 'Privacy', href: 'section-privacy' },
      { label: 'Protection', href: 'section-protection' },
      { label: 'Key Features', href: 'section-features' },
      { label: 'Security', href: 'section-security' },
    ]
  },
  {
    title: 'Developers',
    icon: 'Code',
    items: [
      { label: 'Documentation', href: 'docs.safecircle.tech', external: true },
      { label: 'API Reference', href: '/api', external: true },
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
