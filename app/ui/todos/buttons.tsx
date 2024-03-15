import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTodo } from '@/app/lib/actions';

export function UpsertTodo({ insert }: { insert: boolean }) {
  return (
    <button type="submit" className={`rounded-md border p-2 ${insert ? 'hover:bg-green-200' : 'hover:bg-blue-200'}`}>
        <span className="sr-only">{insert ? 'add' : 'edit'}</span>
        {insert ? <PlusIcon className="w-5" /> : <PencilIcon className="w-5" />}
    </button>
  );
}

export function DeleteTodo({ id,  listId}: { id: string , listId: string}) {
  const deleteTodoWithId = deleteTodo.bind(null, id, listId);
  return (
    <form action={deleteTodoWithId}>
      <button className="rounded-md border p-2 hover:bg-red-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
