'use client';

import { signIn } from 'next-auth/react';

export const LoginForm = () => {
  return (
    <>
      <button onClick={() => signIn()}>Sign In with Discord</button>
    </>
  );
};
