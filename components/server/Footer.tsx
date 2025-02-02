'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import { ParticlesEffect } from '../client/ParticlesEffect';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
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
        <div className="container mx-auto px-4 pt-24 pb-12"> {/* Increased padding-top */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div>
              <h3 className="font-bold text-xl mb-4">SafeCircle</h3>
              <p className="text-white/60">
                Protecting children online through AI and privacy-first technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/60">
                <li>Documentation</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-white/60">
                <li>Discord</li>
                <li>Github</li>
                <li>Twitter</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-white/60 hover:text-white transition-colors" />
                <Twitter className="w-6 h-6 text-white/60 hover:text-white transition-colors" />
                <MessageCircle className="w-6 h-6 text-white/60 hover:text-white transition-colors" />
              </div>
            </div>
          </motion.div>
          
          <div className="mt-12 pt-8 text-center text-white/40 bg-black/20 rounded-lg">
            © 2025 SafeCircle. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
