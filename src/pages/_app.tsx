// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { NextComponentType } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import superjson from 'superjson';
import { AuthGuard } from '../components/AuthGuard';
import { Layout } from '../components/Layout';
import { setupViewportHeightListener } from '../lib/viewportHeight';
import type { AppRouter } from '../server/router';
import '../styles/globals.css';

type CustomAppProps = AppProps<{ session: Session | null }> & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
  const element = (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  return (
    <SessionProvider session={session}>
      {Component.auth ? <AuthGuard>{element}</AuthGuard> : element}
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(App);

setupViewportHeightListener();
