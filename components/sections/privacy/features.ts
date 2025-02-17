import { Eye, Shield, UserX, Lock, FileCheck, UserCog } from 'lucide-react';

export const features = [
  {
    icon: Shield,
    title: 'Data Privacy',
    description: 'Full ownership and control of all your personal data. We ensure your information stays private and secure.',
    stats: 'Full ownership',
    gradient: 'from-purple-500 to-violet-500',
    glowColor: 'rgba(168, 85, 247, 0.2)'
  },
  {
    icon: UserX,
    title: 'Zero Knowledge',
    description: 'Our zero-knowledge architecture means we never see or store your personal information.',
    stats: 'Private by design',
    gradient: 'from-violet-500 to-indigo-500',
    glowColor: 'rgba(139, 92, 246, 0.2)'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear, straightforward policies about how your data is handled, processed, and protected.',
    stats: 'GDPR compliant',
    gradient: 'from-indigo-500 to-blue-500',
    glowColor: 'rgba(79, 70, 229, 0.2)'
  },
  {
    icon: Lock,
    title: 'End-to-End Privacy',
    description: 'Military-grade encryption protects your data at every step, from storage to transmission.',
    stats: 'Always encrypted',
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.2)'
  },
  {
    icon: FileCheck,
    title: 'Data Portability',
    description: 'Download or transfer your data whenever you want. Your data moves with you.',
    stats: 'Full control',
    gradient: 'from-cyan-500 to-teal-500',
    glowColor: 'rgba(6, 182, 212, 0.2)'
  },
  {
    icon: UserCog,
    title: 'Privacy Settings',
    description: 'Fine-tune your privacy preferences with detailed controls for data sharing and visibility.',
    stats: 'Custom controls',
    gradient: 'from-teal-500 to-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.2)'
  }
];
