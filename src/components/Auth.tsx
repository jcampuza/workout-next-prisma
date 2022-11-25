import { useSession } from 'next-auth/react';
import React from 'react';
import { Spinner } from './Spinner';

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <Spinner />;
  }

  return <>{children}</>;
};
