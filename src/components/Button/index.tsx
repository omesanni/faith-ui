import { classNames } from '@/utils';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

const VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-800 text-white shadow-2xs',
  secondary: 'bg-[#f3f3f3] hover:bg-[#dddddd] text-black',
  outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 shadow-2xs',
  ghost: 'text-black hover:bg-[#f3f3f3]',
  danger: 'bg-red-600 hover:bg-red-800 text-white shadow-2xs',
};

function Button({
  type = 'button',
  variant = 'primary',
  className,
  children,
  disabled,
  ...props
}: Props): React.JSX.Element {
  const classes = classNames(
    'transition duration-150 ease-in-out cursor-pointer text-sm font-medium py-2 px-4 rounded-md focus:outline-0',
    VARIANTS[variant],
    { 'disabled:pointer-events-none disabled:opacity-50': disabled },
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
