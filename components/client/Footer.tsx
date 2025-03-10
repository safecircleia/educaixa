'use client';

import { motion } from 'framer-motion';
import { MessageCircleMore, Github, Twitter, MessageCircle, ExternalLink, BookOpen, Shield, FileText, Mail } from 'lucide-react';
import { RiTelegram2Line, RiDiscordFill, RiLinkedinFill, RiYoutubeFill, RiTiktokLine } from "react-icons/ri";
import { ParticlesEffect } from '../client/ParticlesEffect';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedLogo from '@/components/logo/animated-logo'; 
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';

export const Footer = () => {
  const { t } = useLanguage();

  // Use useMemo to avoid recreating footerLinks on every render
  const footerLinks = useMemo(() => ({
    resources: [
      { label: t('footer.documentation') || 'Documentation', href: '/docs', icon: BookOpen },
      { label: t('footer.privacy') || 'Privacy Policy', href: '/privacy', icon: Shield },
      { label: t('footer.terms') || 'Terms of Service', href: '/terms', icon: FileText },
    ],
    community: [
      { label: 'Discord', href: 'https://discord.gg/Ubr6AcAupr', icon: RiDiscordFill, external: true },
      { label: 'Telegram', href: 'https://t.me/safecirclehub', icon: RiTelegram2Line, external: true },
      { label: 'Twitter', href: 'https://twitter.com/safecircleai', icon: Twitter, external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/safecircleai/', icon: RiLinkedinFill, external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/@safecircleai', icon: RiYoutubeFill, external: true },
      { label: 'Tiktok', href: 'https://www.tiktok.com/@safe.circleai', icon: RiTiktokLine, external: true },
    ],
    developers: [
      { label: t('footer.apiReference') || 'API Reference', href: '/api', icon: BookOpen },
      { label: 'GitHub', href: 'https://github.com/safecircleia', icon: Github, external: true },
      { label: t('footer.documentation') || 'Documentation', href: '/docs', icon: FileText },
    ],
    support: [
      { 
        label: t('footer.emailSupport') || 'Email Support',
        href: 'mailto:contact@safecircle.tech',
        icon: Mail,
        description: t('footer.getHelp') || 'Get help from our team'
      }
    ]
  }), [t]);

  return (
    <motion.footer className="relative overflow-hidden">
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-[400px] w-screen [mask-image:radial-gradient(50%_50%,white,transparent)]">
          <ParticlesEffect
            density={1200}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,#4dc8ff2e,transparent_70%)]" />
          <div className="absolute inset-x-0 -bottom-[254px] h-full w-full rounded-[100%] bg-gradient-to-b from-white to-black" />
          <div className="absolute inset-x-0 -bottom-[256px] h-full w-full rounded-[100%] bg-neutral-950 shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 "
          >
            {/* Brand & Description */}
            <div className="md:col-span-4">
              <motion.div className="flex items-center space-x-3 mb-4 group">
                <div className="relative flex items-center justify-center w-15 h-15 overflow-hidden">
                  <AnimatedLogo size={80} className="rounded-full" />
                </div>
                <span className="font-nothing text-3xl text-black">SafeCircle</span>
              </motion.div>
              <p className="text-black">
                {t('footer.description') || 'Protecting children online through AI and privacy-focused technology.'}
              </p>
            </div>
            
            {/* Resources */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4">{t('footer.resourcesTitle') || 'Resources'}</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-2 text-black hover:text-gray-700 transition-colors group"
                    >
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developers */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4">{t('footer.developersTitle') || 'Developers'}</h4>
              <ul className="space-y-2">
                {footerLinks.developers.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center space-x-2 text-black hover:text-gray-700 transition-colors group"
                    >
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      <span>{link.label}</span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Social */}
            <div className="md:col-span-4">
              <h4 className="font-semibold mb-4">{t('footer.supportTitle') || 'Support'}</h4>
              <div className="space-y-4">
                <motion.a
                  href="mailto:support@safecircle.tech"
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg 
                    bg-gradient-to-r from-[#4dc8ff]/10 to-[#2dd4bf]/10
                    hover:from-[#4dc8ff]/20 hover:to-[#2dd4bf]/20
                    border border-white/10 group transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                  <span>{t('footer.contactSupport') || 'Contact Support'}</span>
                </motion.a>

                <div className="flex items-center justify-between pt-6">
                  <div className="flex space-x-4">
                    {footerLinks.community.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg
                          bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                  <motion.span 
                    className="text-sm bg-gradient-to-r from-black to-black/40 bg-clip-text text-transparent hover:from-black hover:to-black/80 transition-all duration-300 ease-out ml-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    {t('footer.copyright') || `© ${new Date().getFullYear()} SafeCircle`}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};