import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';

const Login: NextPage = () => {
  const { data } = useSession();

  if (data) {
    return <>Signed in as {data.user?.email}</>;
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
};

export default Login;
