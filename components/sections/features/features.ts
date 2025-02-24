import { Lock, Clock, Bell, Shield, Users, Zap } from 'lucide-react';

export const features = [
  {
    icon: Shield,
    title: 'Protección Inteligente',
    description: 'Detección y prevención avanzada de amenazas',
    stats: 'Monitoreo 24/7'
  },
  {
    icon: Clock,
    title: 'Control de Tiempo',
    description: 'Límites de uso y programación flexible',
    stats: 'Horarios personalizados'
  },
  {
    icon: Bell,
    title: 'Alertas en Tiempo Real',
    description: 'Notificaciones instantáneas de amenazas',
    stats: 'Respuesta <1s'
  },
  {
    icon: Lock,
    title: 'Control de Acceso',
    description: 'Configuración granular de filtrado de contenido',
    stats: 'Reglas personalizadas'
  },
  {
    icon: Users,
    title: 'Gestión Familiar',
    description: 'Control de múltiples perfiles y dispositivos',
    stats: 'Dispositivos ilimitados'
  },
  {
    icon: Zap,
    title: 'Acciones Rápidas',
    description: 'Respuestas de seguridad con un clic',
    stats: 'Bloqueos instantáneos'
  }
];
