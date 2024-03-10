'use client';

import Link from 'next/link';
import { ListForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateList } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditListForm({
  list,
}: {
  list: ListForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateListWithId = updateList.bind(null, list.id);
  const [state, dispatch] = useFormState(updateListWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        <div className="mb-4">
          <label htmlFor="listName" className="mb-2 block text-sm font-medium">
            Comment se nomme votre liste ? 
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="listName"
                name="listName"
                type="text"
                placeholder="Nom de liste"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="list-error"
                defaultValue={list.name}
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/home"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit List</Button>
      </div>
    </form>
  );
}
