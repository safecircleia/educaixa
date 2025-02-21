import { Header1 } from '@/components/navbar/header';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header1 />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}