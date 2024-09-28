import { DeleteTodo } from '@/app/ui/todos/buttons';
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
          {
            todos?.map(
              (todo) => (
                <div key={todo.id} className="flex justify-between mb-1 w-full bg-white p-2 hover:shadow-lg gap-2">
                  <TodoForm todo={todo} listId={listId}/>
                  <DeleteTodo id={todo.id} listId={listId}/>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}
