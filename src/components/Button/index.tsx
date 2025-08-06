import { classNames } from '@/utils';
import { forwardRef, type ForwardedRef } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

const VARIANTS = {
  primary: 'bg-blue-600 hover:enabled:bg-blue-800 text-white shadow-2xs',
  secondary: 'bg-[#f3f3f3] hover:enabled:bg-[#dddddd] text-black',
  outline: 'outline-1 outline-blue-600 outline-offset-[-1px] text-blue-600 hover:enabled:bg-blue-50 shadow-2xs',
  ghost: 'text-black hover:enabled:bg-[#f3f3f3]',
  danger: 'bg-red-600 hover:enabled:bg-red-800 text-white shadow-2xs',
};

const Button = forwardRef(
  ({
    type = 'button',
    variant = 'primary',
    className,
    children,
    disabled,
    ...props
  }: Readonly<Props>,
  ref: ForwardedRef<HTMLButtonElement>,
): React.JSX.Element => {
  const classes = classNames(
    'transition duration-150 ease-in-out cursor-pointer',
    'text-sm font-medium py-2 px-4 rounded-md',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    className,
  );

  return (
    <button
      {...props}
      type={type}
      ref={ref}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default Button;
