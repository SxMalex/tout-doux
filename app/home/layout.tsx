import Nav from '@/app/ui/nav/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Nav />
        {children}
    </div>
  );
}