import { memo } from 'react';

export type Props = Readonly<{
  id: string;
  disabled?: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}>;

const Tab = memo(({ children }: Props): React.ReactNode => children);

export default Tab;
