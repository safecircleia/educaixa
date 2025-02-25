import { motion } from 'framer-motion';
import { tiers } from '@/lib/constants';
import React from 'react';

interface FormData {
  email: string;
  wallet_address: string;
  tier: number | null;
  amount_paid: number;
}

interface TierGridProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const TierGrid: React.FC<TierGridProps> = ({ formData, setFormData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {tiers.map((tier, index) => (
      <motion.button
        key={tier.name}
        onClick={() => setFormData({ 
          ...formData, 
          tier: index,
          amount_paid: tier.amount
        })}
        className={`flex flex-col h-full p-4 rounded-xl relative overflow-hidden
          border transition-all duration-300 ${
            formData.tier === index 
              ? 'border-[#4dc8ff] bg-white/10' 
              : 'border-white/10 hover:border-white/20'
          }`}
        whileHover={{ scale: 1.02 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-20`} />
        <div className="relative space-y-4">
          <div className="text-center pb-4 border-b border-white/10">
            <h3 className="font-bold text-lg">{tier.name}</h3>
            <p className="text-white/60 text-sm">{tier.description}</p>
            <div className="mt-2 text-[#4dc8ff] font-mono text-2xl">{tier.price}</div>
          </div>
          
          <div className="space-y-2">
            {Object.entries(tier.features).map(([feature, included]) => (
              <div 
                key={feature}
                className={`flex items-center gap-2 text-sm ${
                  included ? 'text-white' : 'text-white/40'
                }`}
              >
                {included ? (
                  <div className="w-4 h-4 rounded-full bg-[#4dc8ff]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#4dc8ff]" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                )}
                {feature}
              </div>
            ))}
          </div>
        </div>

        {formData.tier === index && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4dc8ff]"
          />
        )}
      </motion.button>
    ))}
  </div>
);

export default TierGrid;
