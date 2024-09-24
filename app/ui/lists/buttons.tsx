'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { insertList, deleteList } from '@/app/lib/actions';

export function CreateListButton() {

  const createList = async () => {
    const listName = (document.getElementById('search') as HTMLInputElement)?.value;
    if (!listName) {
      return;
    }
    await insertList(listName);
  }

  return (
    <div>
      <button
        onClick={createList}
        className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <PlusIcon className="h-5" />
      </button>
    </div>
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
