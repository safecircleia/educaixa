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

export const navItems: NavItem[] = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Nosotros',
    href: '#about-us',
  },
  {
    title: 'Comunidad',
    description: 'Únete a nuestra comunidad y mantente al día con las últimas novedades de SafeCircle.',
    items: [
      { 
        label: 'Discord', 
        href: 'https://discord.gg/Ubr6AcAupr', 
        external: true,
        icon: MessageCircle,
        description: 'Únete a nuestra comunidad de Discord'
      },
      { 
        label: 'Telegram', 
        href: 'https://t.me/safecircleai', 
        external: true,
        icon: Send,
        description: 'Síguenos en Telegram'
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/safecircleai',
        external: true,
        icon: Twitter,
        description: 'Síguenos en Twitter'
      },
      { 
        label: 'Foro', 
        href: '/forum', 
        comingSoon: true,
        icon: MessageSquare,
        description: 'Discute y comparte ideas'
      },
      { 
        label: 'Blog', 
        href: '/blog', 
        comingSoon: true,
        icon: BookText,
        description: 'Lee nuestras últimas actualizaciones'
      },
    ]
  },
  {
    title: 'Token',
    href: '/token',
  }
];

