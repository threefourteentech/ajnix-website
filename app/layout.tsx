import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnix.com'),
  title: {
    default: 'Ajnix — Multi-touch attribution for WooCommerce',
    template: '%s · Ajnix',
  },
  description:
    'The first WordPress plugin with real multi-touch attribution for WooCommerce. Install free in under 2 minutes.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Ajnix',
    images: ['/favicon/android-chrome-512x512.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#6366f1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
