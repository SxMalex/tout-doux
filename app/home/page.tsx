import { Metadata } from 'next';
import Pagination from '@/app/ui/lists/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/lists/table';
import { CreateList } from '@/app/ui/lists/buttons';
import { ListsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchListsPages } from '@/app/lib/data';
 
export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchListsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search lists..." />
        <CreateList />
      </div>
      <Suspense key={query + currentPage} fallback={<ListsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}