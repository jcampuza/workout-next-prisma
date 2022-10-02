import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from './Spinner';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession({ required: true });
  const { replace } = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !data.user) {
      replace('/auth/login');
    }
  }, [data?.user, replace, status]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
};
