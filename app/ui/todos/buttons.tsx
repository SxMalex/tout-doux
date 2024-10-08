'use client';
import { CheckIcon, TrashIcon, PlusIcon, RocketLaunchIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTodo, insertTodo, doneTodo, todoTodo, inProgressTodo, failTodo } from '@/app/lib/actions';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function CreateTodoButton({ listId }: { listId: string }) {

  const pathname = usePathname();
  const { replace } = useRouter();

  const createTodo = async () => {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const todoName = searchInput?.value;
    if (!todoName) {
      return;
    }
    await insertTodo(listId, todoName);
    searchInput.value = '';
    replace(pathname);
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

export function DeleteTodoButton({ id,  listId}: { id: string , listId: string}) {
  const deleteTodoWithId = deleteTodo.bind(null, id, listId);
  return (
    <form action={deleteTodoWithId}>
      <button className="rounded-md border p-2 hover:bg-red-400">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DoneTodoButton({ id,  listId, status}: { id: string, listId: string, status: string}) {
  const doneTodoWithId = doneTodo.bind(null, id, listId);
  const buttonClass = status === 'done'
    ? 'rounded-md border p-2 bg-green-500 text-white hover:bg-green-400'
    : 'rounded-md border p-2 hover:bg-green-400';
  return (
    <form action={doneTodoWithId}>
      <button className={buttonClass}>
        <span className="sr-only">Done</span>
        <CheckIcon className="w-5" />
      </button>
    </form>
  );
}

export function TodoTodoButton({ id,  listId, status}: { id: string, listId: string, status: string}) {
  const todoTodoWithId = todoTodo.bind(null, id, listId);
  const buttonClass = status === 'todo'
    ? 'rounded-md border p-2 bg-yellow-500 text-white hover:bg-yellow-400'
    : 'rounded-md border p-2 hover:bg-yellow-400';
  return (
    <form action={todoTodoWithId}>
      <button className={buttonClass}>
        <span className="sr-only">Todo</span>
        <RocketLaunchIcon className="w-5" />
      </button>
    </form>
  );
}

export function InProgressTodoButton({ id,  listId, status}: { id: string, listId: string, status: string}) {
  const inProgressTodoWithId = inProgressTodo.bind(null, id, listId);
  const buttonClass = status === 'in progress'
    ? 'rounded-md border p-2 bg-blue-500 text-white hover:bg-blue-400'
    : 'rounded-md border p-2 hover:bg-blue-400';
  return (
    <form action={inProgressTodoWithId}>
      <button className={buttonClass}>
        <span className="sr-only">InProgress</span>
        <ArrowPathIcon className="w-5" />
      </button>
    </form>
  );
}

export function FailTodoButton({ id,  listId, status}: { id: string, listId: string, status: string}) {
  const failTodoWithId = failTodo.bind(null, id, listId);
  const buttonClass = status === 'fail'
    ? 'rounded-md border p-2 bg-neutral-500 text-white hover:bg-neutral-400'
    : 'rounded-md border p-2 hover:bg-neutral-400';
  return (
    <form action={failTodoWithId}>
      <button className={buttonClass}>
        <span className="sr-only">InProgress</span>
        <XMarkIcon className="w-5" />
      </button>
    </form>
  );
}

