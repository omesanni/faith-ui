import React from 'react';
import { cn } from '@/utils';

interface Props {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Switch({ id, disabled, checked, onClick }: Props) {
  const btnClasses = cn(
    'h-[1.125rem] w-8 shadow-xs rounded-full transition-colors duration-200 ease-in-out',
    { 'bg-[#dddddd]': !checked, 'bg-blue-600': checked },
    { 'disabled:pointer-events-none disabled:opacity-50': disabled },
  );
  const spanClasses = cn(
    'w-4 h-4 block ml-[0.0625rem] mr-[0.0625rem] transition duration-400 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.2)] rounded-full bg-white',
    { 'translate-x-[calc(100%-2px)]': checked },
  );

  return (
    <button
      id={id}
      role="switch"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-checked={checked}
      className={btnClasses}
    >
      <span className={spanClasses}></span>
    </button>
  );
}

export default Switch;
