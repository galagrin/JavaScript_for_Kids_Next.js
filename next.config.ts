import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    compress: true,
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['react-icons'],
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },
    async headers() {
        return [
            // Статика Next (с хешами) — можно кэшировать надолго
            {
                source: '/_next/static/(.*)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/_next/image(.*)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            // Внутренние API — кэш через CDN на 5 минут + SWR
            {
                source: '/api/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, s-maxage=300, stale-while-revalidate=86400' }],
            },
        ];
    },
    poweredByHeader: false,
    output: 'standalone',
};

export default nextConfig;
