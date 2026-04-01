import type { Metadata } from 'next';
import './globals.css';
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Renders Arc',
  description: 'We craft purposeful digital experiences — from strategy and branding to web design and marketing — built to elevate your business.',
  icons: {
    icon: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", montserrat.variable)}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
