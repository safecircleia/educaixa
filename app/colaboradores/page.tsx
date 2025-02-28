import { Metadata } from 'next';
import { ColaboradoresContent } from '@/components/colaboradores/ColaboradoresContent';
import { Footer } from '@/components/client/Footer';

export const metadata: Metadata = {
  title: 'Colaboradores',
  description: 'Learn about SafeCircle\'s strategic partnerships with technology giants, educational institutions, and child protection organizations working together for online safety.',
  openGraph: {
    title: 'SafeCircle Partners - Building a Safer Digital World Together',
    description: 'Join forces with SafeCircle and our network of partners in technology, education, and child protection to create a safer digital environment.',
  }
};

export default function ColaboradoresPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-blue-500/20 -top-10 -right-32" />
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-violet-500/20 -bottom-20 -left-32" />
      </div>

      <section className="w-full py-32">
        <ColaboradoresContent />
      </section>

      <Footer />
    </main>
  );
}