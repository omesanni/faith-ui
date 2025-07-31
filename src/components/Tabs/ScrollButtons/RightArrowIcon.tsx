import { memo } from 'react';
import { ROTATE_ICON_CLASS } from '../constants';

// AUTHOR: Ankush Syal https://www.svgrepo.com/svg/520912/right-arrow
interface Props {
  width?: number;
  height?: number;
  rotate?: keyof typeof ROTATE_ICON_CLASS;
}

function RightArrowIcon({
  rotate,
  width = 24,
  height = 24,
}: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={rotate && ROTATE_ICON_CLASS[rotate]}
    >
      <path
        d="M10 7L15 12L10 17"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default memo(RightArrowIcon);
