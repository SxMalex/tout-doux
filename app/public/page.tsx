import { Metadata } from 'next';
import { getUserByPublicList } from '@/app/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Public',
};

export default async function Page() {
  const users = await getUserByPublicList();
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden mt-8">
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2">
            <div>
              {
                users?.map(
                  (user) => (
                    <Link 
                      href={`/public/users/${user.id}/public_lists`}
                      key={user.id}
                      className="flex justify-between items-center mb-2 w-full bg-white p-4 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="mb-2 flex items-center">
                            <p>{user.name}</p>
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