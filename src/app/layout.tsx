import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Renders Arc — Premium Design & Digital Agency',
  description: 'We craft purposeful digital experiences — from strategy and branding to web design and marketing — built to elevate your business.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
