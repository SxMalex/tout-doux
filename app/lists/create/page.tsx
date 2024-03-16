import Form from '@/app/ui/lists/form';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Lists',
};
 
export default async function Page() {
  return (
    <main>
      <Form list={null}/>
    </main>
  );
}