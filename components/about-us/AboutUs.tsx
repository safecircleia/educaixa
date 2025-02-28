'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Target, Briefcase, Globe, Shield, Sparkles, Award, Twitter } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ODSContent } from './ODSContent';
import Image from 'next/image';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/20 group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </div>
);

const TeamMemberCard = ({ member, index }: { member: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 + index * 0.1 }}
    viewport={{ once: true }}
    className="group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />
    <div className="relative p-6 rounded-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-purple-500/20 transform group-hover:scale-110 transition-all duration-300">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 64px) 100vw, 64px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
        <div className="flex-grow space-y-2">
          <div>
            <h4 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">
              {member.name}
            </h4>
            <p className="text-sm bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-semibold">
              {member.role}
            </p>
          </div>
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
            {member.description}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400/60" />
          <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
            Activo en SafeCircle
          </span>
        </div>
        {member.twitter && (
          <a
            href={`https://twitter.com/${member.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Twitter className="w-4 h-4 text-blue-400" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Tomas Palma Sanchez",
      role: "Fundador & CEO",
      description: "Desarrollador web y diseñador principal de SafeCircle. Experto en seguridad digital y desarrollo de soluciones innovadoras.",
      icon: <Sparkles className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />,
      image: "/team/tomaspfp.jpg",
      twitter: "toomas_ps"
    },
    {
      name: "Victor Muñoz Salazar",
      role: "Co-fundador & CMO",
      description: "Jefe de Marketing y Comunicación. Especialista en estrategias de crecimiento y relaciones públicas.",
      icon: <Globe className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />,
      image: "/team/victorpfp.jpg",
      twitter: "_mnozz"
    },
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
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Comunidad",
      description: "Compromiso con el bienestar digital colectivo"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-400" />,
      title: "Excelencia",
      description: "Búsqueda constante de la máxima calidad"
    }
  ];

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8">
          {/* Descripción Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard {...value} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Conoce a las mentes creativas detrás de SafeCircle
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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

          {/* ODS Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.2)" className="h-full">
              <div className="p-8">
                <ODSContent />
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};