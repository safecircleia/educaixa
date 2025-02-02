'use client';

import { motion } from 'framer-motion';
import { MessageCircleMore, Github, Twitter, MessageCircle, ExternalLink, BookOpen, Shield, FileText, Mail } from 'lucide-react';
import { RiTelegram2Line, RiDiscordFill } from "react-icons/ri";
import { ParticlesEffect } from '../client/ParticlesEffect';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  resources: [
    { label: 'Documentation', href: '/docs', icon: BookOpen },
    { label: 'Privacy Policy', href: '/privacy', icon: Shield },
    { label: 'Terms of Service', href: '/terms', icon: FileText },
  ],
  community: [
    { label: 'Discord', href: 'https://discord.gg/Ubr6AcAupr', icon: RiDiscordFill, external: true },
    { label: 'Telegram', href: 'https://t.me/safecircleai', icon: RiTelegram2Line, external: true },
    { label: 'Twitter', href: 'https://twitter.com/safecircleai', icon: Twitter, external: true },
  ],
  developers: [
    { label: 'API Reference', href: '/api', icon: BookOpen },
    { label: 'GitHub', href: 'https;//github.com/tresillo2017', icon: Github, external: true },
    { label: 'Documentation', href: '/docs', icon: FileText },
  ],
  support: [
    { 
      label: 'Email Support',
      href: 'mailto:support@safecircle.tech',
      icon: Mail,
      description: 'Get help from our team'
    }
  ]
};

export const Footer = () => {
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
        <div className="container mx-auto px-4 pt-24 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div>
              <motion.div 
                className="flex items-center space-x-3 mb-4 group"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo-nbg.png"
                    alt="SafeCircle Logo"
                    width={32}
                    height={32}
                    className="relative z-10"
                  />
                </div>
                <span className="font-nothing text-xl text-white/90">SafeCircle</span>
              </motion.div>
              <p className="text-white/60">
                Protecting children online through AI and privacy-first technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group"
                    >
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2">
                {footerLinks.developers.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group"
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

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-4">
                <motion.a
                  href="mailto:support@safecircle.tech"
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg 
                    bg-gradient-to-r from-[#4dc8ff]/10 to-[#2dd4bf]/10
                    hover:from-[#4dc8ff]/20 hover:to-[#2dd4bf]/20
                    border border-white/10 group"
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                  <span>Contact Support</span>
                </motion.a>
                <p className="text-sm text-white/60">
                  Our team is here to help you 24/7
                </p>
              </div>
              
              <div className="mt-6 flex space-x-4">
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
            </div>
          </motion.div>
          
          <div className="mt-12 pt-8 text-center text-white/40 border-t border-white/5">
            © {new Date().getFullYear()} SafeCircle. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};