import { UpdateTodo, DeleteTodo } from '@/app/ui/todos/buttons';
import { fetchFilteredTodos } from '@/app/lib/data';
import TodoForm from '@/app/ui/todos/form';

export default async function TodosTable({
  query,
  currentPage,
  listId
}: {
  query: string;
  currentPage: number;
  listId: string;
}) {
  const todos = await fetchFilteredTodos(query, currentPage, listId);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {
              todos?.map(
                (todo) => (
                  <div
                    key={todo.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <TodoForm todo={todo} listId={listId}/>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div className="flex justify-end gap-2">
                        <DeleteTodo id={todo.id} listId={listId}/>
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
