import { classNames } from '@/utils';
import {
  Children,
  type JSX,
  type ReactElement,
  useMemo,
} from 'react';
import Avatar from './Persona';
import { GROUP_HOVER_EFFECTS, GROUP_STACK_SPACING } from './constants';

interface Props {
  /**
   *  The maximum number of personas to display before truncating.
   *  If set to 0, all personas will be displayed.
  */
  max?: number;
  /** Extra classes to apply to the max element. */
  maxElemClassName?: string;
  /** The children elements to display as personas. */
  children: ReactElement | ReactElement[];
  /** Whether to stack the personas on top each other. */
  stacked?: boolean;
  /** Data test attribute for testing purposes. */
  dataTestId?: string;
  /** The spacing between stacked personas. */
  stackSpacing?: keyof typeof GROUP_STACK_SPACING;
  /** The hover effect to apply to the personas. */
  hoverEffect?: keyof typeof GROUP_HOVER_EFFECTS;
  /** A custom render function for the max element when personas are truncated. */
  renderMaxElement?: (
    remainder: ReactElement[],
    visible: ReactElement[],
  ) => ReactElement;
}

function PersonaGroup({
  max = 0,
  children,
  stacked = true,
  stackSpacing = 'md',
  maxElemClassName,
  renderMaxElement,
  hoverEffect,
}: Props): JSX.Element {
  const personas = useMemo((): ReactElement[] => {
    const isMultipleChildren = Array.isArray(children);
    const getClasses = (i: number): string | undefined => {
      if (isMultipleChildren) {
        return classNames(
          'peer transition-all',
          hoverEffect && GROUP_HOVER_EFFECTS[hoverEffect](stackSpacing),
          {
            [GROUP_STACK_SPACING[stackSpacing]]: stacked && i,
            'mr-0.5': !stacked && i < children.length - 1,
          },
        );
      }
      return undefined;
    };
    const childrenArr = Children.map(
      children,
      (child: ReactElement, i: number): ReactElement => (
        <div key={`child-${i}`} className={getClasses(i)}>
          {child}
        </div>
      ),
    );

    const shouldTruncate = max > 0 && childrenArr.length > max;
    if (shouldTruncate) {
      const visibleChildren = childrenArr.slice(0, max);
      const invisibleChildren = childrenArr.slice(max);
      const remainingCount = childrenArr.length - max;

      return [
        ...visibleChildren,
        <div
          key={`child-${visibleChildren.length}`}
          className={getClasses(visibleChildren.length)}
        >
          {renderMaxElement ? (
            renderMaxElement(invisibleChildren, visibleChildren)
          ) : (
            <Avatar
              text={`+${remainingCount}`}
              className={maxElemClassName}
            />
          )}
        </div>,
      ];
    }
    return childrenArr;
  }, [
    max,
    children,
    stacked,
    hoverEffect,
    maxElemClassName,
    renderMaxElement,
    stackSpacing,
  ]);

  return (
    <div className="flex">
      {personas}
    </div>
  );
}

export default PersonaGroup;
