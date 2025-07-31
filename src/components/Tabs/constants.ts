export const VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export const ORIENTATION = {
  vertical: 'vertical',
  horizontal: 'horizontal',
} as const;

export const ORIENTATION_CLASSES = {
  main: {
    vertical: 'flex-row',
    horizontal: 'flex-col',
  },
  navList: {
    primary: {
      vertical: 'flex-col border-r w-fit gap-2 border-gray-200',
      horizontal: 'border-b gap-4 border-gray-200',
    },
    secondary: {
      vertical: 'flex-col',
      horizontal: '',
    },
  },
  tab: {
    enabled: 'cursor-pointer hover:text-blue-600',
    primary: {
      border: '',
      active: 'text-blue-600',
      vertical: {
        padding: 'py-1 pr-3',
      },
      horizontal: {
        padding: 'p-1',
      },
    },
    secondary: {
      border: 'rounded-md',
      active: 'bg-blue-600 transition-all duration-300 hover:text-white text-white',
      vertical: {
        padding: 'py-2 px-4',
      },
      horizontal: {
        padding: 'py-2 px-4',
      },
    },
  },
  scrollButton: {
    primary: 'top-[4px]',
    secondary: 'top-[8px]',
  },
  indicator: {
    vertical: 'w-0.5',
    horizontal: 'bottom-0 h-0.5',
  },
};

export const DEFAULT_INDICATOR_STYLE = {
  top: undefined,
  left: undefined,
  width: undefined,
  right: undefined,
  height: undefined,
};

export const ROTATE_ICON_CLASS = {
  up: 'rotate-270',
  left: 'rotate-180',
  down: 'rotate-90',
};
