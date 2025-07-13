import { classNames } from '@/utils';
import { PERSONA_BADGE_COLORS, RING_COLORS } from './constants';

interface Props {
  /** The background color of the badge. */
  color?: keyof typeof PERSONA_BADGE_COLORS;
  /** The content to display inside the badge. */
  children?: React.ReactNode;
  /** Whether the badge have rounded corners. */
  isRounded?: boolean;
  /** Extra CSS classes to apply to the badge. */
  className?: string;
  /** Data test attribute for testing purposes. */
  dataTestId?: string;
  /** The color of the outline around the badge. */
  outlineColor?: keyof typeof RING_COLORS;
}

function PersonaBadge({
  color = 'rose',
  children,
  isRounded = true,
  className,
  dataTestId,
  outlineColor = 'white',
}: Props): React.JSX.Element {
  const classes = classNames(
    'absolute text-xs px-1 text-white flex items-center place-content-center min-w-3.5 min-h-3.5',
    PERSONA_BADGE_COLORS[color],
    `border-2 ${RING_COLORS[outlineColor]}`,
    { 'rounded-full': isRounded },
    className,
  );

  return (
    <span className={classes} data-testid={dataTestId}>
      {children}
    </span>
  )
}

export default PersonaBadge;
