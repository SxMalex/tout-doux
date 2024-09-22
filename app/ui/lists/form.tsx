'use client';

import Link from 'next/link';
import { ListForm } from '@/app/lib/definitions';
import { QueueListIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { upsertList, updateListStatus } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function EditListForm({
  list,
}: {
  list: ListForm | null;
}) {
  const initialState = { message: "", errors: {} };
  const updateListWithId = upsertList.bind(null, list?.id);
  const [state, dispatch] = useFormState(updateListWithId, initialState);

  const [isPublic, setIsPublic] = useState(list?.status === "public");

  const handleToggleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
    await updateListStatus({
      id: list?.id,
      status: e.target.checked ? 'public' : 'private',
    });
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md p-4">
          <div className="mt-2 rounded-md">
            <div className="flex">
              <QueueListIcon className="w-5 pointer-events-none text-gray-500 peer-focus:text-gray-900" />
              <input
                id="listName"
                name="listName"
                type="text"
                placeholder="Nom de liste"
                className="peer block w-full rounded-md py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="list-error"
                defaultValue={list?.name}
                required
              />
            </div>
          <div id="list-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500" key={state.message}>
            {state.message}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <div className="flex items-center justify-evenly w-full">
          <div><EyeSlashIcon className="w-5 pointer-events-none text-gray-500 peer-focus:text-gray-900" /></div>
          <label htmlFor="listStatus" className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="listStatus" 
              className="sr-only peer"
              checked={isPublic}
              onChange={handleToggleChange}
            />
            <div className="block bg-blue-900 w-16 h-9 p-1 rounded-full">
              <div
                className={`bg-blue-600 w-7 h-7 rounded-full transition-all duration-500 ${
                  isPublic ? 'translate-x-7 bg-white' : ''
                }`}
              ></div>
            </div>
          </label>
          <div><EyeIcon className="w-5 pointer-events-none text-gray-500 peer-focus:text-gray-900" /></div>
        </div>
        <Link
          href="/home"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Retour
        </Link>
        <Button type="submit">Sauver</Button>
      </div>
    </form>
  );
}
