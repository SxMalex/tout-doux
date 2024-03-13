'use client';

import Link from 'next/link';
import { TodosTable } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { upsertTodo } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({
  todo,
  listId
}: {
  todo: TodosTable | null,
  listId: string
}) {
  const initialState = { message: "", errors: {} };
  const upsertTodoWithId = upsertTodo.bind(null, todo?.id, listId);
  const [state, dispatch] = useFormState(upsertTodoWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="todoName"
                name="todoName"
                type="text"
                placeholder="Nom du todo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="list-error"
                defaultValue={todo?.name}
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="list-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500" key={state?.message}>
            {state?.message}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Valider</Button>
      </div>
    </form>
  );
}
