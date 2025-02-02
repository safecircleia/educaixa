'use client';

import { motion } from 'framer-motion';
import { usePhantom } from '../../hooks/usePhantom';
import { useState, useEffect } from 'react';
import { PhantomIcon } from '../PhantomIcon';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { connect, connected, address } = usePhantom();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-sm
        ${isScrolled ? 'bg-black/40' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <motion.div
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          whileHover={{ scale: 1.05 }}
        >
          SAFECIRCLE
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Features', id: 'features' },
            { name: 'How It Works', id: 'how-it-works' },
            { name: 'Token', id: 'token' }
          ].map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-white/70 hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item.name}
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent 
                scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
          ))}
          
          <motion.button
            onClick={connect}
            className="px-4 py-2 rounded-lg flex items-center gap-2 bg-white/5 hover:bg-white/10 
              transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PhantomIcon className="w-5 h-5" />
            {connected ? `${address?.slice(0, 6)}...` : 'Connect'}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
