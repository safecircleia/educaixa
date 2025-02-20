import { ChevronRight } from 'lucide-react';
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";

const ODSIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-5 h-5 text-emerald-400"
  >
    {/* Outer circle */}
    <circle
      cx="12"
      cy="12"
      r="11"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.3"
    />
    {/* Middle circle */}
    <circle
      cx="12"
      cy="12"
      r="8"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />
    {/* Inner circle */}
    <circle
      cx="12"
      cy="12"
      r="5"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Center dot */}
    <circle
      cx="12"
      cy="12"
      r="1"
      fill="currentColor"
    />
    {/* Small circles around */}
    {Array.from({ length: 17 }).map((_, i) => {
      const angle = (i * 360) / 17;
      const x = 12 + 9 * Math.cos((angle * Math.PI) / 180);
      const y = 12 + 9 * Math.sin((angle * Math.PI) / 180);
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.5"
          fill="currentColor"
        />
      );
    })}
  </svg>
);

export const ODSContent = () => {
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
    <div>
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
  );
};