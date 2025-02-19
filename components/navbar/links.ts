import { LucideIcon, Shield, Code, Users, Coins } from 'lucide-react';

interface NavSubItem {
  label: string;
  href: string;
  external?: boolean;
  comingSoon?: boolean; // Optional flag to indicate if the link is coming soon/disabled
}

interface NavItem {
  title: string;
  icon: 'Shield' | 'Code' | 'Users' | 'Coins';
  IconComponent: LucideIcon;
  items: NavSubItem[];
}

export const navItems: NavItem[] = [
  {
    title: 'About Us',
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
      { label: 'Documentation', href: 'docs.safecircle.tech', external: true, comingSoon: true },
      { label: 'API Reference', href: '/api', external: true, comingSoon: true },
      { label: 'GitHub', href: 'https://github.com/safecircleia', external: true },
    ]
  },
  {
    title: 'Community',
    icon: 'Users',
    IconComponent: Users,
    items: [
      { label: 'Discord', href: 'https://discord.gg/Ubr6AcAupr', external: true },
      { label: 'Forum', href: '/forum', comingSoon: true},
      { label: 'Blog', href: '/blog', comingSoon: true },
    ]
  },
  {
    title: 'Token',
    icon: 'Coins',
    IconComponent: Coins,
    items: [
      { label: 'Tokenomics', href: '/token' },
      { label: 'Governance', href: '/governance' },
      { label: 'Staking', href: '/staking' },
    ]
  }
];

export const links = [
  {
    title: 'How it Works',
    href: '#section-how-it-works',
  },
  {
    title: 'Features',
    href: '#section-features',
  },
  {
    title: 'Privacy',
    href: '#section-privacy',
  },
  {
    title: 'Security',
    href: '#section-security-protection',
  },
] as const;

export const legalLinks = [
  {
    title: 'Privacy Policy',
    href: '/privacy',
  },
  {
    title: 'Terms of Service',
    href: '/terms',
  },
] as const;