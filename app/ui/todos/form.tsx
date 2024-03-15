'use client';

import Link from 'next/link';
import { TodosTable } from '@/app/lib/definitions';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { upsertTodo } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { UpsertTodo } from '@/app/ui/todos/buttons';

export default function Form({
  todo,
  listId,
  insert
}: {
  todo: TodosTable | null,
  listId: string,
  insert: boolean
}) {
  const initialState = { message: "", errors: {} };
  const upsertTodoWithId = upsertTodo.bind(null, todo?.id, listId);
  const [state, dispatch] = useFormState(upsertTodoWithId, initialState);


  return (
    <form action={dispatch} className="w-full">
      <div className="flex justify-between items-center">
        <input
          id="todoName"
          name="todoName"
          type="text"
          placeholder="Nom du todo"
          className="block w-full rounded-md py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="list-error"
          defaultValue={todo?.name}
          required
        />
        <UpsertTodo insert={insert} />
      </div>
      <div id="list-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500" key={state?.message}>
            {state?.message}
          </p>
      </div>
    </form>
  );
}
