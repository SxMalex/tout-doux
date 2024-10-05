import clsx from 'clsx';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/actions';
import { CheckIcon, TrashIcon, PlusIcon, RocketLaunchIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ButtonLogOut(){
  return(
    <form action={async () => { await logout();}}>
      <button className="p-3 hover:text-red-600">
        <PowerIcon className="w-6" />
      </button>
    </form>
  )
}


export function IconTemplate({status}:{status: string}){
  switch (status) {
    case 'done':
      return (<CheckIcon className={`w-5`} />);
    case 'todo':
      return (<RocketLaunchIcon className={`w-5`} />);
    case 'in progress':
      return (<ArrowPathIcon className={`w-5`} />);
    case 'fail':
      return (<XMarkIcon className={`w-5`} />);
  }
}
