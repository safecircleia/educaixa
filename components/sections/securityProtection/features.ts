import { LucideIcon } from 'lucide-react';
import { ShieldCheck, Shield, Network, Lock, KeyRound, ClipboardCheck } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
}

const baseFeatures = [
  {
    icon: ShieldCheck,
    key: 'multilayerprotection'
  },
  {
    icon: Shield,
    key: 'privactemonitoring'
  },
  {
    icon: Network,
    key: 'networkshield'
  },
  {
    icon: Lock,
    key: 'advancedencryption'
  },
  {
    icon: KeyRound,
    key: 'accesscontrol'
  },
  {
    icon: ClipboardCheck,
    key: 'continueauditory'
  }
] as const;

export const getFeatures = (t: (key: string) => string): Feature[] => {
  return baseFeatures.map(({ icon, key }) => ({
    icon,
    title: t(`sections.securityprotection.features.${key}.title`),
    description: t(`sections.securityprotection.features.${key}.description`),
    stats: t(`sections.securityprotection.features.${key}.slug`)
  }));
};
