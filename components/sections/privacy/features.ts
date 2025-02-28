import { Eye, Shield, UserX, Lock, FileCheck, UserCog } from 'lucide-react';

export const features = [
  {
    icon: Shield,
    title: 'Privacidad de Datos',
    description: 'Control y propiedad total de tus datos personales. Garantizamos que tu información permanezca privada y segura.',
    stats: 'Control total',
    gradient: 'from-purple-500 to-violet-500',
    glowColor: 'rgba(168, 85, 247, 0.2)'
  },
  {
    icon: UserX,
    title: 'Conocimiento Cero',
    description: 'Nuestra arquitectura de conocimiento cero significa que nunca vemos ni almacenamos tu información personal.',
    stats: 'Privado por diseño',
    gradient: 'from-violet-500 to-indigo-500',
    glowColor: 'rgba(139, 92, 246, 0.2)'
  },
  {
    icon: Eye,
    title: 'Transparencia',
    description: 'Políticas claras y directas sobre cómo se manejan, procesan y protegen tus datos.',
    stats: 'GDPR compatible',
    gradient: 'from-indigo-500 to-blue-500',
    glowColor: 'rgba(79, 70, 229, 0.2)'
  },
  {
    icon: Lock,
    title: 'Privacidad E2E',
    description: 'Cifrado de grado militar que protege tus datos en cada paso, desde el almacenamiento hasta la transmisión.',
    stats: 'Siempre cifrado',
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.2)'
  },
  {
    icon: FileCheck,
    title: 'Portabilidad',
    description: 'Descarga o transfiere tus datos cuando quieras. Tus datos se mueven contigo.',
    stats: 'Control completo',
    gradient: 'from-cyan-500 to-teal-500',
    glowColor: 'rgba(6, 182, 212, 0.2)'
  },
  {
    icon: UserCog,
    title: 'Ajustes de Privacidad',
    description: 'Configura tus preferencias de privacidad con controles detallados para compartir y visibilidad de datos.',
    stats: 'Controles personalizados',
    gradient: 'from-teal-500 to-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.2)'
  }
];
