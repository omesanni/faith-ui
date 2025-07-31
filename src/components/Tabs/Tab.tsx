import { memo } from 'react';

export interface Props {
  id: string;
  disabled?: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

function Tab({ children }: Props): React.ReactNode {
  return children;
}

const MemoTab = memo(Tab);
MemoTab.displayName = 'Tab';

export default MemoTab;
