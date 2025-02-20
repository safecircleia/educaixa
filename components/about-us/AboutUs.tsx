'use client';

import { motion } from 'framer-motion';
import { Info, FileText, Users, Target, Briefcase, Heart, Building2, Scale, Handshake, Globe } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import Image from 'next/image';
import { ODSContent }  from './ODSContent';

export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Tomas Palma Sanchez",
      role: "Fundador",
      description: "Desarrollador web y diseñador de SafeCircle"
    },
    {
      name: "Victor Muñoz Salazar",
      role: "Co-fundador",
      description: "Jefe de Marketing y Comunicación de SafeCircle"
    },
  ];

  const odsData = [
    {
      number: 3,
      title: "Salud y Bienestar",
      imageUrl: "/ods/3.png",
      description: "Promovemos el bienestar digital y la salud mental de los menores en el entorno online"
    },
    {
      number: 8,
      title: "Trabajo Decente",
      imageUrl: "/ods/8.png",
      description: "Impulsamos el desarrollo tecnológico sostenible y el crecimiento económico responsable"
    },
    {
      number: 16,
      title: "Paz y Justicia",
      imageUrl: "/ods/16.png",
      description: "Contribuimos a crear un internet más seguro y justo para todos"
    },
    {
      number: 17,
      title: "Alianzas",
      imageUrl: "/ods/17.png",
      description: "Colaboramos con instituciones para fortalecer la seguridad digital"
    }
  ];

  return (
    <section id="about-us" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/10">
              <Info className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                Sobre Nosotros
              </h2>
              <p className="text-white/60 text-lg">
                Protegiendo el futuro digital de tu familia
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
          {/* Descripción - Spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-2"
          >
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-2">
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

          {/* Quiénes Somos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1"
          >
            <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="h-full">
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white/90">Quiénes Somos</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                      Somos un equipo apasionado llamado “Empresaurios” de expertos en tecnología y seguridad digital, comprometidos con la protección de menores en el entorno digital y con ganas de hacer este mundo un lugar más seguro. Nuestra experiencia combinada en inteligencia artificial, ciberseguridad y desarrollo de software nos permite crear soluciones innovadoras que protegen sin invadir la privacidad.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Team Members Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1"
          >
            <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="h-full">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white/90">Nuestro Equipo</h3>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm border border-blue-500/10"
                    >
                      <h4 className="font-bold text-lg text-white/90">{member.name}</h4>
                      <p className="text-sm text-blue-400">{member.role}</p>
                      <p className="text-sm text-white/60 mt-1">{member.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Nuestra Misión - Spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-2"
          >
            <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="h-full">
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white/90">Nuestra Misión</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed text-lg">
                    Nuestra misión es proporcionar a las familias las herramientas necesarias para proteger a sus hijos en el mundo digital, manteniendo un equilibrio perfecto entre seguridad y privacidad. Creemos en un internet más seguro para todos, donde los menores puedan explorar y aprender sin riesgos innecesarios.
                  </p>
                </div>
                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/10">
                  <div className="font-mono text-2xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">24/7</div>
                  <div className="text-sm text-white/70">Protección y Soporte</div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ODS Section - Spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-2"
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