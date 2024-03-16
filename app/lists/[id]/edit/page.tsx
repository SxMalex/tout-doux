import ListForm from '@/app/ui/lists/form';
import TodoForm from '@/app/ui/todos/form';
import { fetchListById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Table from '@/app/ui/todos/table';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { TodoTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { fetchTodosPages } from '@/app/lib/data';
import Pagination from '@/app/ui/lists/pagination';
 
export const metadata: Metadata = {
  title: 'Edit Lists',
};
 
export default async function Page({ 
  params,
  searchParams 
}: { 
  params: { id: string },
  searchParams?: {
    query?: string;
    page?: string;
  };
})
{
  const id = params.id;
  const [list] = await Promise.all([fetchListById(id),]);

  if (!list) {
    notFound();
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTodosPages(query, id);

  return (
    <main className="max-w-md mx-auto">
      <ListForm list={list}/>
      <div className="w-full">
        <div className="m-4 flex items-center justify-between gap-2 ">
          <Search placeholder="Search todos..." />
        </div>
        <div className="m-4 flex items-center justify-between gap-2 ">
          <TodoForm todo={null} listId={list.id} insert={true}/>
        </div>
        <Suspense key={query + currentPage} fallback={<TodoTableSkeleton />}>
          <Table query={query} currentPage={currentPage} listId={id}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}