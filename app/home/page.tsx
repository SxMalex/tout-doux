import { Metadata } from 'next';
import Pagination from '@/app/ui/lists/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/lists/table';
import { CreateListButton } from '@/app/ui/lists/buttons';
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
    <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden mt-8">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 px-4">
        <Search placeholder="Search and create lists..." />
        <CreateListButton />
      </div>
      <Suspense key={query + currentPage} fallback={<ListsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 mb-5 flex w-full justify-center px-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}