import Form from '@/app/ui/lists/edit-form';
import { fetchListById } from '@/app/lib/data';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit Lists',
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [list] = await Promise.all([
    fetchListById(id),
  ]);

  return (
    <main>
      <Form list={list}/>
    </main>
  );
}