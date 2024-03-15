import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function TodoFormSkeleton({ key }: { key: number }){
  return(
    <Fragment key={key}>
      <div className="flex justify-between mb-1 w-full bg-white p-2 gap-2">
        <div className="flex justify-between items-center w-full">
          <input
            id="todoName"
            name="todoName"
            type="text"
            className="block w-full rounded-md py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="list-error"
            disabled 
          />
          <button className={`rounded-md border p-2 hover:bg-blue-200`}>
            <span className="sr-only">edit</span>
            <PencilIcon className="w-5 text-gray-300" />
          </button>
        </div>
        <button className="rounded-md border p-2 hover:bg-red-200">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5 text-gray-300" />
        </button>
      </div>
    </Fragment>
  )
}

export function TodoTableSkeleton() {
  return  (
    <div className={`${shimmer} mt-6 flow-root`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {[...Array(6)].map( key =><TodoFormSkeleton key={key} />)}
        </div>
      </div>
    </div>
  )
}

export function ListsCardSkeleton({ key }: { key: number }) {
  return (
    <Fragment key={key}>
      <div className="flex justify-between items-center mb-2 w-full bg-white p-4 hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center">
              <p> </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex justify-end gap-2">
            <button className="rounded-md border p-2 hover:bg-red-200">
              <PencilIcon className="w-5" />
            </button>
            <button className="rounded-md border p-2 hover:bg-red-200">
              <span className="sr-only">Delete</span>
              <TrashIcon className="w-5" />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export function ListsTableSkeleton() {
  return (
    <div className={`${shimmer} mt-6 flow-root`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {[...Array(6)].map( key =><ListsCardSkeleton key={key} />)}
        </div>
      </div>
    </div>
  );
}
