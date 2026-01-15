import { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

// AUTHOR: ShopWare https://www.svgrepo.com/svg/450042/chevron-down-s
function ChevronDownIcon({
  width = 16,
  height = 16,
  className,
}: Readonly<Props>): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -3 14 14"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.70711 0.29289C1.31658 -0.09763 0.68342 -0.09763 0.29289 0.29289C-0.09763 0.68342 -0.09763 1.3166 0.29289 1.7071L6.2929 7.7071C6.6834 8.0976 7.3166 8.0976 7.7071 7.7071L13.7071 1.7071C14.0976 1.3166 14.0976 0.68342 13.7071 0.29289C13.3166 -0.09763 12.6834 -0.09763 12.2929 0.29289L7 5.5858L1.70711 0.29289z"
        fill="#71717a"
      />
    </svg>
  );
}

export default memo(ChevronDownIcon);
