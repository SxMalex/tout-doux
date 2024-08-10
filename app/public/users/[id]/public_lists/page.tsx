import { Metadata } from 'next';
import { getPublicListByUserId } from '@/app/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Public_lists',
};

export default async function Page({ 
  params
}: { 
  params: { id: string }
}) {
  const publicLists = await getPublicListByUserId(params.id);
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden mt-8">
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2">
            <div>
              {
                publicLists?.map(
                  (list) => (
                    <Link 
                      key={list.id} 
                      href={`/public/lists/${list.id}`}
                      className="flex justify-between items-center mb-2 w-full bg-white p-4 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="mb-2 flex items-center">
                              <p>{list.name}</p>
                            </div>
                          </div>
                        </div>
                    </Link>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}