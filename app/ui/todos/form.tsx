'use client';

import { TodosTable } from '@/app/lib/definitions';
import { updatetodoName } from '@/app/lib/actions';
import { useDebouncedCallback } from 'use-debounce';
import { useRef, useEffect } from 'react';

export default function Form({ todo, listId }: { todo: TodosTable, listId: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTodoUpdateName = useDebouncedCallback(async (todoName) => {
    if (todoName) {
      await updatetodoName({
        id: todo.id,
        name: todoName,
      });
    }
  }, 300);

  // Adjust the textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height on initial render

    // Add a resize event listener to adjust the textarea on window resize
    const handleResize = () => adjustTextareaHeight();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <form className="w-full">
      <div className="flex justify-between items-center">
        <textarea
          ref={textareaRef}
          id="todoName"
          name="todoName"
          className="block w-full rounded-md py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 overflow-hidden resize-none transition-all duration-200 ease-in-out"
          defaultValue={todo?.name}
          onChange={(e) => {
            handleTodoUpdateName(e.target.value);
            adjustTextareaHeight(); // Adjust height on each change
          }}
        />
      </div>
    </form>
  );
}
