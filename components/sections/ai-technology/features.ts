import { Code2, Brain, Settings, Blocks, Zap, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
}

// Base features array with icons only
const baseFeatures = [
  {
    icon: Code2,
    key: 'opensource'
  },
  {
    icon: Brain,
    key: 'owndevelopment'
  },
  {
    icon: Settings,
    key: 'modulararq'
  },
  {
    icon: Blocks,
    key: 'aispecialized'
  },
  {
    icon: Zap,
    key: 'higheficiency'
  },
  {
    icon: Users,
    key: 'activecommunity'
  }
] as const;

export const getFeatures = (t: (key: string) => string): Feature[] => {
  return baseFeatures.map(({ icon, key }) => ({
    icon,
    title: t(`sections.aiTechnology.features.${key}.title`),
    description: t(`sections.aiTechnology.features.${key}.description`),
    stats: t(`sections.aiTechnology.features.${key}.slug`)
  }));
};
