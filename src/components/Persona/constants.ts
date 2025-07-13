export const PERSONA_SIZES = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

export const GROUP_STACK_SPACING = {
  xs: '-ml-6',
  sm: '-ml-4',
  md: '-ml-2',
};

export const GROUP_HOVER_EFFECTS = {
  tranScale: (): string => 'hover:-translate-y-2 hover:scale-110 hover:z-10',
  setAside: (k: string): string | undefined => ({
    md: 'peer-hover:translate-x-3',
    sm: 'peer-hover:translate-x-5',
    xs: 'peer-hover:translate-x-7',
  }[k]),
};

export const RING_COLORS = {
  sky: 'border-sky-300',
  rose: 'border-rose-500',
  pink: 'border-pink-500',
  blue: 'border-blue-600',
  gray: 'border-gray-400',
  lime: 'border-lime-400',
  white: 'border-white',
  black: 'border-black',
  green: 'border-green-600',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  yellow: 'border-yellow-400',
  slate: 'border-slate-300',
} as const;

export const PERSONA_BADGE_COLORS = {
  sky: 'bg-sky-300',
  rose: 'bg-rose-500',
  pink: 'bg-pink-500',
  blue: 'bg-blue-600',
  gray: 'bg-gray-400',
  lime: 'bg-lime-400',
  white: 'bg-white',
  black: 'bg-black',
  green: 'bg-green-600',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-400',
  slate: 'bg-slate-300',
};

export const PERSONA_BADGE_PLACEMENT = {
  'top-right': {
    nonEmpty: {
      ringWithOutline: {
        xl: 'top-0 right-0',
        default: 'top-[-8px] right-0',
      },
      noRingWithOutline: {
        xl: 'top-0 right-[2px]',
        default: 'top-[-4px] right-0',
      },
    },
    empty: {
      ringWithOutline: {
        xl: 'top-0 right-[6px]',
        default: 'top-[-2px] right-0',
      },
      noRingWithOutline: {
        xl: 'top-0 right-[8px]',
        default: 'top-0 right-0',
      },
    },
  },
  'top-left': {
    nonEmpty: {
      ringWithOutline: {
        xl: 'top-0 left-0',
        default: 'top-[-8px] left-0',
      },
      noRingWithOutline: {
        xl: 'top-0 left-[2px]',
        default: 'top-[-4px] left-0'
      },
    },
    empty: {
      ringWithOutline: {
        xl: 'top-0 left-[6px]',
        default: 'top-[-2px] left-0',
      },
      noRingWithOutline: {
        xl: 'top-0 left-[8px]',
        default: 'top-0 left-0',
      },
    },
  },
  'bottom-right': {
    nonEmpty: {
      ringWithOutline: {
        xl: 'bottom-0 right-0',
        default: 'bottom-[-8px] right-0',
      },
      noRingWithOutline: {
        xl: 'bottom-0 right-[2px]',
        default: 'bottom-[-4px] right-0',
      },
    },
    empty: {
      ringWithOutline: {
        xl: 'bottom-0 right-[6px]',
        default: 'bottom-[-2px] right-0',
      },
      noRingWithOutline: {
        xl: 'bottom-0 right-[8px]',
        default: 'bottom-0 right-0',
      },
    },
  },
  'bottom-left': {
    nonEmpty: {
      ringWithOutline: {
        xl: 'bottom-0 left-0',
        default: 'bottom-[-8px] left-0',
      },
      noRingWithOutline: {
        xl: 'bottom-0 left-[2px]',
        default: 'bottom-[-4px] left-0',
      },
    },
    empty: {
      ringWithOutline: {
        xl: 'bottom-0 left-[6px]',
        default: 'bottom-[-2px] left-0',
      },
      noRingWithOutline: {
        xl: 'bottom-0 left-[8px]',
        default: 'bottom-0 left-0',
      },
    },
  },
};
