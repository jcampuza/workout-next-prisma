// src/pages/_app.tsx
import '../styles/globals.css';
import { NextComponentType } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { trpc } from '../lib/trpc';
import { Auth } from '../components/Auth';

type CustomAppProps = AppProps<{ session: Session | null }> & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
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
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(App);
