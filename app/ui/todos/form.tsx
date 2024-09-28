'use client';

import { TodosTable } from '@/app/lib/definitions';
import { updatetodoName } from '@/app/lib/actions';
import { useDebouncedCallback } from 'use-debounce';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Form({todo, listId}: {todo: TodosTable, listId: string,}) {

  const handleTodoUpdateName = useDebouncedCallback(async (todoName) => {
    if(todoName){
      await updatetodoName({
        id: todo.id,
        name: todoName, 
     });
    }
  }, 300);

  return (
    <form className="w-full">
      <div className="flex justify-between items-center">
        <input
          id="todoName"
          name="todoName"
          type="text"
          className="block w-full rounded-md py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={todo?.name}
          onChange={(e) => {
            handleTodoUpdateName(e.target.value);
          }}
        />
      </div>
    </form>
  );
}
