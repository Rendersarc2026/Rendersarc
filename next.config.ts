import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Serve AVIF where supported (noticeably smaller than WebP for the portfolio
  // screenshots), falling back to WebP.
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
