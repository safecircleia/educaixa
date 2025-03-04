import { Header1 } from '@/components/navbar/header';
import '../styles/token-header.css';
import '../styles/token-footer.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col token-page">
      <Header1 />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}