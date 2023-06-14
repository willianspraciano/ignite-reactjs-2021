import { useCan } from '@/hooks/useCan';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Can({ children, permissions, roles }: IProps) {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) return null;

  return <>{children}</>;
}
