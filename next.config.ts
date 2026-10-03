import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Serve AVIF where supported (noticeably smaller than WebP for the portfolio
  // screenshots), falling back to WebP.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Portfolio images are served from the Supabase Storage bucket.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ubiselvwvmoykzmgyldy.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
