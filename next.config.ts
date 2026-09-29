import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Nine pages became five: team, partners, initiatives, media and contact
      // all live on /about now.
      // Staunch Ventures' studio and co-investment network are the home page.
      { source: "/ventures", destination: "/#studio", permanent: true },
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
