import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '../server/common/get-server-auth-session';

export const withSignInRequired = (callback: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/api/auth/signin',
        },
      };
    }

    return callback(ctx);
  };
};
