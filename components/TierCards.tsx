'use client';

import { motion } from 'framer-motion';

const tiers = [
  {
    title: 'Beta Access',
    price: '100K $SC',
    features: ['Early access', 'Basic monitoring', 'Community access'],
    icon: '⌨️'
  },
  {
    title: 'Beta + Alerts',
    price: '500K $SC',
    features: ['Real-time alerts', 'Threat detection', 'Priority support'],
    icon: '🛡️'
  },
  {
    title: 'Full Governance',
    price: '1M $SC',
    features: ['DAO voting rights', 'Protocol proposals', 'Revenue share'],
    icon: '⚡'
  }
];

export const TierCards = () => {
  return (
    <section className="container mx-auto px-4 py-32">
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-6 rounded-xl bg-gray-900/50 border border-cyan-500/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl" />
            <div className="relative">
              <div className="text-4xl mb-4">{tier.icon}</div>
              <h3 className="text-xl font-bold mb-2">{tier.title}</h3>
              <div className="text-cyan-400 font-mono mb-4">{tier.price}</div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-gray-300">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
