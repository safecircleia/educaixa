import { LucideIcon, Shield, Code, Users, Coins } from 'lucide-react';

interface NavItem {
  title: string;
  icon: 'Shield' | 'Code' | 'Users' | 'Coins';
  IconComponent: LucideIcon;
  items: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

export const navItems: NavItem[] = [
  {
    title: 'Platform',
    icon: 'Shield',
    IconComponent: Shield,
    items: [
      { label: 'How it Works', href: 'section-how-it-works' },
      { label: 'AI Technology', href: 'section-ai' },
      { label: 'Privacy', href: 'section-privacy' },
      { label: 'Security & Protection', href: 'section-security-protection' },
      { label: 'Key Features', href: 'section-features' },
    ]
  },
  {
    title: 'Developers',
    icon: 'Code',
    IconComponent: Code,
    items: [
      { label: 'Documentation', href: 'docs.safecircle.tech', external: true },
      { label: 'API Reference', href: '/api', external: true },
      { label: 'GitHub', href: 'https://github.com/safecircleia', external: true },
    ]
  },
  {
    title: 'Community',
    icon: 'Users',
    IconComponent: Users,
    items: [
      { label: 'Discord', href: 'https://discord.gg/Ubr6AcAupr', external: true },
      { label: 'Forum', href: '/forum' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  {
    title: 'Token',
    icon: 'Coins',
    IconComponent: Coins,
    items: [
      { label: 'Tokenomics', href: '#token' },
      { label: 'Governance', href: '/governance' },
      { label: 'Staking', href: '/staking' },
    ]
  }
];