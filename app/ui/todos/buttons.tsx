'use client';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTodo, insertTodo } from '@/app/lib/actions';

export function CreateTodoButton({ listId }: { listId: string }) {

  const createTodo = async () => {
    const todoName = (document.getElementById('search') as HTMLInputElement)?.value;
    if (!todoName) {
      return;
    }
    await insertTodo(listId, todoName);
  }

  return (
    <div>
      <button
        onClick={createTodo}
        className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <PlusIcon className="h-5" />
      </button>
    </div>
  );
}

export function UpsertTodo({ insert }: { insert: boolean }) {
  return (
    <button type="submit" className={`rounded-md border p-2 ${insert ? 'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'hover:bg-blue-200'}`}>
        <span className="sr-only">{insert ? 'add' : 'edit'}</span>
        {insert ? <PlusIcon className="h-5" /> : <PencilIcon className="w-5" />}
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
