import { classNames } from '@/utils';
import { cloneElement, useCallback } from 'react';
import { PERSONA_BADGE_PLACEMENT, PERSONA_SIZES, RING_COLORS } from './constants';

interface Props {
  /** The source URL of the image. */
  src?: string;
  /** The alternative text for the image. */
  alt?: string;
  /** The size of the persona. default is md */
  size?: keyof typeof PERSONA_SIZES;
  /** The text to display when no image is provided. */
  text?: React.ReactNode;
  /** The color of the border ring around the persona. default is rose */
  ringColor?: keyof typeof RING_COLORS;
  /** Whether to display a ring around the persona. */
  withRing?: boolean;
  /** Extra CSS classes to apply to the persona. */
  className?: string;
  /** Whether to apply a space offset between the border ring and the image/text.
   * default is true
  */
  withRingOffset?: boolean;
  /** Whether to apply a shadow effect to the persona. */
  withShadow?: boolean;
  /** The click event handler for the persona. */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** Data test attribute for testing purposes. */
  dataTestId?: string;
  /** A badge element to display on the persona. */
  badge?: React.JSX.Element;
  /** The placement of the badge relative to the persona. default is top-right */
  badgePlacement?: keyof typeof PERSONA_BADGE_PLACEMENT;
  /** Extra properties to apply to the image element. */
  extraImageProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}

function Persona({
  alt,
  src,
  text,
  size = 'md',
  badge,
  onClick,
  withRing,
  className,
  ringColor = 'rose',
  withShadow,
  dataTestId,
  withRingOffset = true,
  badgePlacement = 'top-right',
  extraImageProps,
}: Props): React.JSX.Element {
  const getBadge = useCallback((): React.ReactNode => {
    if (badge) {
      const key = withRing ? 'ringWithOutline' : 'noRingWithOutline';
      const { className, children } = badge.props;
      const map = PERSONA_BADGE_PLACEMENT[badgePlacement][
        children ? 'nonEmpty' : 'empty'
      ];

      return cloneElement(badge, {
        className: classNames(
          'absolute',
          map[key]?.[size === 'xl' ? size : 'default'],
          className,
        ),
      });
    }
    return null;
  }, [
    badge,
    size,
    withRing,
    badgePlacement,
  ]);

  const spanClasses = classNames(
    'flex relative rounded-full',
    PERSONA_SIZES[size],
    {
      'bg-gray-200 text-black items-center justify-center': !src,
      [`border-2 ${RING_COLORS[ringColor]}`]: withRing,
      'inset-ring-2 inset-ring-white': !src && withRing && withRingOffset,
      'p-0.5': src && withRing && withRingOffset,
      'shadow-[0.25rem_0.25rem_0.5rem_rgba(0,0,0,0.2)]': withShadow,
    },
    className,
  );

  return (
    <span
      onClick={onClick}
      className={spanClasses}
      data-testid={dataTestId}
    >
      {src ? (
        <img
          {...extraImageProps}
          src={src}
          alt={alt}
          className={classNames(
            'size-full rounded-full object-contain',
            extraImageProps?.className,
          )}
        />
      ) : (
        text
      )}
      {getBadge()}
    </span>
  );
}

export default Persona;
