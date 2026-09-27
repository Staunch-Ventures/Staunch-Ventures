import type {NextConfig} from 'next';

// Cross-site links resolve per environment: production links the real hosts
// (the fund lives on its own subdomain), while previews and localhost keep
// every link inside the one deployment so the whole ecosystem is testable.
const isProduction = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CAPITAL_URL: isProduction ? "https://capital.staunchventures.com" : "/capital",
    NEXT_PUBLIC_MAIN_URL: isProduction ? "https://www.staunchventures.com" : "",
  },
  async redirects() {
    return [
      // Nine pages became five: team, partners, initiatives, media and contact
      // all live on /about now.
      { source: "/team", destination: "/about#team", permanent: true },
      { source: "/ecosystem", destination: "/about#ecosystem", permanent: true },
      { source: "/media", destination: "/about#media", permanent: true },
      { source: "/contact", destination: "/about#contact", permanent: true },
      { source: "/impact/bag-learning", destination: "/ventures/bag-learning", permanent: true },
      { source: "/impact/get-in-the-ring", destination: "/ecosystem/get-in-the-ring", permanent: true },
      { source: "/impact", destination: "/ventures", permanent: true },
      { source: "/partners", destination: "/about#ecosystem", permanent: true },
      { source: "/dashboard", destination: "/investor/dashboard", permanent: true },
      { source: "/dashboard/:path*", destination: "/investor/:path*", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
