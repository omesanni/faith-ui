import { classNames } from '@/utils';

interface Props {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Switch({
  id,
  disabled,
  checked = false,
  className,
  ariaLabel,
  ariaLabelledBy,
  onClick,
}: Props) {
  const btnClasses = classNames(
    'h-[18px] w-8 shadow-xs rounded-full transition-colors duration-200 ease-in-out',
    'disabled:cursor-not-allowed disabled:opacity-50',
    { 'bg-[#dddddd]': !checked, 'bg-blue-600': checked },
    className,
  );
  const spanClasses = classNames(
    'w-4 h-4 block ml-[1px] mr-[1px] transition duration-400 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.2)] rounded-full bg-white',
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
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <span className={spanClasses}></span>
    </button>
  );
}

export default Switch;
