import { LucideIcon } from 'lucide-react';
import { Shield, Eye, FileOutput, Lock, KeyRound, Settings2 } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
}

const baseFeatures = [
  {
    icon: Shield,
    key: 'dataprivacy'
  },
  {
    icon: Eye,
    key: 'transparency'
  },
  {
    icon: FileOutput,
    key: 'portability'
  },
  {
    icon: Lock,
    key: 'zeroknowledge'
  },
  {
    icon: KeyRound,
    key: 'e2e'
  },
  {
    icon: Settings2,
    key: 'privacysettings'
  }
] as const;

export const getFeatures = (t: (key: string) => string): Feature[] => {
  return baseFeatures.map(({ icon, key }) => ({
    icon,
    title: t(`sections.privacy.features.${key}.title`),
    description: t(`sections.privacy.features.${key}.description`),
    stats: t(`sections.privacy.features.${key}.slug`)
  }));
};
