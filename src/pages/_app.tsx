// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { NextComponentType } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="Workout Tracking" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Workout Tracking" />
        <meta name="description" content="Simple workout/percentage tracking app" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#663399" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#663399" />

        <link rel="apple-touch-icon" href="/touch-icon-iphone.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#663399" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://workout-next-prisma.vercel.app" />
        <meta name="twitter:title" content="Workout Tracking" />
        <meta name="twitter:description" content="Simple workout/percentage tracking app" />
        <meta
          name="twitter:image"
          content="https://workout-next-prisma.vercel.app/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@CampuzanoJoe" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Workout Tracking" />
        <meta property="og:description" content="Simple workout/percentage tracking app" />
        <meta property="og:site_name" content="Workout Tracking" />
        <meta property="og:url" content="https://workout-next-prisma.vercel.app" />
        <meta
          property="og:image"
          content="https://workout-next-prisma.vercel.app/apple-touch-icon.png"
        />
      </Head>
      <SessionProvider session={session}>
        {Component.auth ? <AuthGuard>{element}</AuthGuard> : element}
      </SessionProvider>
    </>
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
    };
  },
  ssr: false,
})(App);

setupViewportHeightListener();
