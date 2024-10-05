import { Metadata } from 'next';
import { getPublicTodoByListId, getColorByStatus } from '@/app/lib/data';
import { IconTemplate } from '@/app/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Public_todos',
};

export default async function Page({ params }: { params: { id: string }}) {
  const publicTodos = await getPublicTodoByListId(params.id);
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden mt-8">
      <div className="mt-6 flow-root">
        <div className="rounded-lg bg-gray-50 p-2">
          <div>
            {
              publicTodos?.map(
                (todo) => {
                  const color = getColorByStatus(todo.status);
                  return (
                  <div 
                    key={todo.id} 
                    className="flex justify-between items-center mb-2 w-full bg-white p-4 hover:shadow-lg"
                  >
                      <div className="flex items-center justify-between">
                        <div className="mb-2 flex items-center">
                          <p className="break-all">{todo.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`flex rounded-md border p-2 bg-${color}-500 text-white`}>
                          <IconTemplate status={todo.status} />
                        </div>
                      </div>
                  </div>
                )}
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}