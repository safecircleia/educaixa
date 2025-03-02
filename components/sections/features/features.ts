import { LucideIcon } from 'lucide-react';
import { 
  Brain, 
  Shield, 
  Clock, 
  BellRing, 
  Users, 
  Sliders 
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
}

const baseFeatures = [
  {
    icon: Brain,
    key: 'intelligentprotection'
  },
  {
    icon: BellRing,
    key: 'realtimealerts'
  },
  {
    icon: Users,
    key: 'familymanagement'
  },
  {
    icon: Clock,
    key: 'timecontrol'
  },
  {
    icon: Shield,
    key: 'accesscontrol'
  },
  {
    icon: Sliders,
    key: 'fastactions'
  }
] as const;

export const getFeatures = (t: (key: string) => string): Feature[] => {
  return baseFeatures.map(({ icon, key }) => ({
    icon,
    title: t(`sections.characteristics.features.${key}.title`),
    description: t(`sections.characteristics.features.${key}.description`),
    stats: t(`sections.characteristics.features.${key}.slug`)
  }));
};
