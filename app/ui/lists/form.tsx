'use client';

import { ListForm } from '@/app/lib/definitions';
import { QueueListIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { updateListStatus, updateListName } from '@/app/lib/actions';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function EditListForm({list}: {list: ListForm }) {

  const [isPublic, setIsPublic] = useState(list?.status === "public");

  const handleToggleChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
    await updateListStatus({
      id: list?.id,
      status: e.target.checked ? 'public' : 'private',
    });
  }, 300);

  const handleListUpdateName = useDebouncedCallback(async (listName) => {
    if(listName){
      await updateListName({
        id: list?.id,
        name: listName, 
     });
    }
  }, 300);

  return (
    <form>
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
              onChange={(e) => {
                handleListUpdateName(e.target.value);
              }}
            />
          </div>
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
      </div>
    </form>
  );
}
