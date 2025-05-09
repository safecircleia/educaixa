import { Github, FileCode2, BookOpen, MessageCircle, Send, MessageSquare, BookText, LucideIcon, Twitter } from 'lucide-react';

interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  comingSoon?: boolean;
  icon?: LucideIcon;
}

interface NavItem {
  title: string;
  href?: string;
  description?: string;
  items?: NavSubItem[];
}

// Define a simpler link structure for direct use in mobile-nav and header
interface Link {
  href: string;
  label: string;
}

// Export links as a constant for direct use in mobile-nav and header components
export const links: Link[] = [
  {
    label: 'navigation.home',
    href: '/',
  },
  {
    label: 'navigation.about',
    href: '/about-us',
  },
  {
    label: 'navigation.needs',
    href: '/necesidades',
  },
  {
    label: 'navigation.collaborators',
    href: '/colaboradores',
  },
  {
    label: 'navigation.token',
    href: '/token',
  },
  {
    label: 'navigation.gancho',
    href: '/gancho',
  }
];

// Keep the original function for backward compatibility
export const getNavItems = (t: (key: string) => string): NavItem[] => [
  {
    title: t('navigation.home'),
    href: '/',
  },
  {
    title: t('navigation.about'),
    href: '/about-us',
  },
  {
    title: t('navigation.needs'),
    href: '/necesidades',
  },
  {
    title: t('navigation.collaborators'),
    href: '/colaboradores',
  },
  {
    title: t('navigation.token'),
    href: '/token',
  },
  {
    title: t('navigation.gancho'),
    href: '/gancho',
  }
  // {
  //   title: t('navigation.community.title'),
  //   description: t('navigation.community.description'),
  //   items: [
  //     { 
  //       label: t('navigation.community.discord.label'), 
  //       href: 'https://discord.gg/Ubr6AcAupr', 
  //       external: true,
  //       icon: MessageCircle,
  //       description: t('navigation.community.discord.description')
  //     },
  //     { 
  //       label: t('navigation.community.telegram.label'), 
  //       href: 'https://t.me/safecircleia', 
  //       external: true,
  //       icon: Send,
  //       description: t('navigation.community.telegram.description')
  //     },
  //     {
  //       label: t('navigation.community.twitter.label'),
  //       href: 'https://twitter.com/safecircleai',
  //       external: true,
  //       icon: Twitter,
  //       description: t('navigation.community.twitter.description')
  //     },
  //     { 
  //       label: t('navigation.community.forum.label'), 
  //       href: '/forum', 
  //       comingSoon: true,
  //       icon: MessageSquare,
  //       description: t('navigation.community.forum.description')
  //     },
  //     { 
  //       label: t('navigation.community.blog.label'), 
  //       href: '/blog', 
  //       comingSoon: true,
  //       icon: BookText,
  //       description: t('navigation.community.blog.description')
  //     },
  //   ]
  // },
];

