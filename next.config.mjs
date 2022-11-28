import nextPWA from 'next-pwa';
import nextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const withPWA = nextPWA({
  dest: 'public',
});

export default withBundleAnalyzer(
  withPWA(
    defineNextConfig({
      reactStrictMode: true,
      swcMinify: true,
      // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
      i18n: {
        locales: ['en'],
        defaultLocale: 'en',
      },
      experimental: {
        appDir: true,
      },
    })
  )
);
