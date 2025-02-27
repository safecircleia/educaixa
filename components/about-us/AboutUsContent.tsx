'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Target, Globe, Shield, Sparkles, Award, Twitter, ChevronRight } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import Image from 'next/image';

const ODSIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-5 h-5 text-emerald-400"
  >
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    {Array.from({ length: 17 }).map((_, i) => {
      const angle = (i * 360) / 17;
      const x = 12 + 9 * Math.cos((angle * Math.PI) / 180);
      const y = 12 + 9 * Math.sin((angle * Math.PI) / 180);
      return (
        <circle key={i} cx={x} cy={y} r="0.5" fill="currentColor" />
      );
    })}
  </svg>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/20 group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/70">{description}</p>
  </div>
);

// Define a proper type for team members
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 + (index % 6) * 0.1 }}
    viewport={{ once: true }}
    className="h-full"
  >
    <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/20 group h-full flex flex-col">
      <div className="flex flex-col items-center text-center mb-4 md:mb-6">
        <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4 overflow-hidden bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-purple-500/20 transform group-hover:scale-105 transition-all duration-300 rounded-full flex items-center justify-center">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 96px, 112px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-full" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">
            {member.name}
          </h4>
          <p className="text-sm bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-semibold">
            {member.role}
          </p>
        </div>
      </div>
      
      <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed text-center flex-grow">
        {member.description}
      </p>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400/60" />
          <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
            Activo en SafeCircle
          </span>
        </div>
        <div className="flex gap-2">
          {member.twitter && (
            <a
              href={`https://twitter.com/${member.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label={`Twitter de ${member.name}`}
            >
              <Twitter className="w-4 h-4 text-blue-400" />
            </a>
          )}
          {/* Additional social icons can be added here */}
        </div>
      </div>
    </div>
  </motion.div>
);

export function AboutUsContent() {
  const teamMembers: TeamMember[] = [
    {
      name: "Tomas Palma Sanchez",
      role: "Fundador & CEO",
      description: "Desarrollador web y diseñador principal de SafeCircle. Experto en seguridad digital y desarrollo de soluciones innovadoras.",
      image: "/team/tomaspfp.png",
      twitter: "toomas_ps"
    },
    {
      name: "Victor Muñoz Salazar",
      role: "Co-fundador & CMO",
      description: "Jefe de Marketing y Comunicación. Especialista en estrategias de crecimiento y relaciones públicas.",
      image: "/team/victorpfp.png",
      twitter: "_mnozz"
    },
    {
      name: "Fabio Bernal Garcia",
      role: "Ayudante",
      description: "Ayudante de ideas y decisiones. Aporta su visión y creatividad al equipo de SafeCircle.",
      image: "/team/fabiopfp.png",
      twitter: "",
    }
  ];

const values = [
    {
        icon: <Shield className="w-6 h-6 text-blue-400" />,
        title: "Privacidad",
        description: "Protección sin compromiso de la privacidad personal"
    },
    {
        icon: <Target className="w-6 h-6 text-blue-400" />,
        title: "Innovación",
        description: "Tecnología de vanguardia para la seguridad digital"
    },
    {
        icon: <Award className="w-6 h-6 text-blue-400" />,
        title: "Excelencia",
        description: "Búsqueda constante de la máxima calidad"
    },
    {
        icon: <FileText className="w-6 h-6 text-blue-400" />,
        title: "Código Abierto",
        description: "Transparencia y colaboración a través del código abierto"
    }
];

  const odsData: Gallery4Props = {
    items: [
      {
        id: "ods-3",
        title: "Salud y Bienestar",
        description: "Promovemos el bienestar digital y la salud mental de los menores en el entorno online. Nuestras soluciones ayudan a crear un ambiente digital saludable y seguro para el desarrollo de los niños y adolescentes.",
        href: "https://www.un.org/sustainabledevelopment/es/health/",
        image: "/ods/3.png"
      },
      {
        id: "ods-8",
        title: "Trabajo Decente",
        description: "Impulsamos el desarrollo tecnológico sostenible y el crecimiento económico responsable. Creamos oportunidades para la innovación en ciberseguridad y protección digital.",
        href: "https://www.un.org/sustainabledevelopment/es/economic-growth/",
        image: "/ods/8.png"
      },
      {
        id: "ods-16",
        title: "Paz y Justicia",
        description: "Contribuimos a crear un internet más seguro y justo para todos. Trabajamos para prevenir el ciberacoso y proteger a los menores de contenidos dañinos, promoviendo la justicia en el entorno digital.",
        href: "https://www.un.org/sustainabledevelopment/es/peace-justice/",
        image: "/ods/16.png"
      },
      {
        id: "ods-17",
        title: "Alianzas para los Objetivos",
        description: "Colaboramos con instituciones para fortalecer la seguridad digital. Establecemos alianzas estratégicas con organizaciones comprometidas con la protección de menores en internet.",
        href: "https://www.un.org/sustainabledevelopment/es/globalpartnerships/",
        image: "/ods/17.png"
      }
    ]
  };

  return (
    <>
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/10">
            <Users className="w-7 h-7 text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
          Sobre Nosotros
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
          Conoce nuestra misión, equipo y valores que impulsan nuestro compromiso con la seguridad digital
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full">
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white/90">Descripción</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                SafeCircle es una herramienta que detecta mensajes sospechosos (pederastia, ciberacoso, seguridad financiera…) en plataformas de mensajería y redes sociales, alertando a padres en caso de peligro y respetando la privacidad de los hijos. Gracias al trabajo automático de la IA y con total privacidad, SafeCircle ofrece la tranquilidad de saber que tus hijos navegan y se relacionan de manera sana y segura, sin el inconveniente de monitorizar cada una de las apps que los menores utilizan.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
              Nuestros Valores
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y compromiso
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <FeatureCard key={index} {...value} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
                  Nuestro Equipo
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto mb-8">
                  Conoce a las mentes creativas detrás de SafeCircle
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard key={member.name} member={member} index={index} />
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="h-full">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white/90">Nuestra Misión</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                Nuestra misión es proporcionar a las familias las herramientas necesarias para proteger a sus hijos en el mundo digital, manteniendo un equilibrio perfecto entre seguridad y privacidad. Creemos en un internet más seguro para todos, donde los menores puedan explorar y aprender sin riesgos innecesarios.
              </p>
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/10">
                <div className="font-mono text-2xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-white/70">Protección y Soporte</div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="col-span-1"
        >
          <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.2)" className="h-full">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 flex items-center justify-center">
                  <ODSIcon />
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold md:text-4xl text-xl text-white">Objetivos de Desarrollo Sostenible</p>
                  <ChevronRight className="w-5 h-5 text-emerald-400 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </div>
              </div>
              <Gallery4 {...odsData} />
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </>
  );
}