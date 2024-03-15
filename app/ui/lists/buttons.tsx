import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteList } from '@/app/lib/actions';

export function CreateList() {
  return (
    <Link
      href="/lists/create"
      className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create List</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateList({ id }: { id: string }) {
  return (
    <Link
      href={`/lists/${id}/edit`}
      className="rounded-md border p-2 hover:bg-blue-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteList({ id }: { id: string }) {
  const deleteListWithId = deleteList.bind(null, id);
  return (
    <form action={deleteListWithId}>
      <button className="rounded-md border p-2 hover:bg-red-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
