import Navbar from '@/app/ui/nav/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  );
}