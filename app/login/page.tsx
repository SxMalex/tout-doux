import LoginForm from '@/app/ui/login-form';
import Image from "next/image";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Se connecter',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex items-center self-center rounded-lg">
          <div className="w-32">
            <Image
              src="/logo.jfif"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="une image qu'elle est bien a regarder"
            />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}