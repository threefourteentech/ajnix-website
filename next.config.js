/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: process.env.NEXT_PUBLIC_WP_API_URL
      ? [
          {
            protocol: 'https',
            hostname: new URL(process.env.NEXT_PUBLIC_WP_API_URL).hostname,
          },
        ]
      : [],
  },
  async rewrites() {
    return {
      // Rewrites run before pages but after the next-intl middleware,
      // so we map the public /vs-:slug URL to the internal /vs/:slug folder.
      beforeFiles: [
        { source: '/vs-:slug', destination: '/vs/:slug' },
        { source: '/:locale(fr|en)/vs-:slug', destination: '/:locale/vs/:slug' },
      ],
    };
  },
};

module.exports = withNextIntl(nextConfig);
