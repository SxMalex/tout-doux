import Image from 'next/image';
import { UpdateList, DeleteList } from '@/app/ui/lists/buttons';
import { fetchFilteredLists } from '@/app/lib/data';

export default async function ListsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const lists = await fetchFilteredLists(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {
              lists?.map(
                (list) => (
                  <div key={list.id} className="flex  justify-between items-center mb-2 w-full bg-white p-4 hover:shadow-lg">
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <p>{list.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex justify-end gap-2">
                        <UpdateList id={list.id} />
                        <DeleteList id={list.id} />
                      </div>
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
