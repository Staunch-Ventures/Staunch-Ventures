import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/impact/bag-learning", destination: "/ventures/bag-learning", permanent: true },
      { source: "/impact/get-in-the-ring", destination: "/ecosystem/get-in-the-ring", permanent: true },
      { source: "/impact", destination: "/ventures", permanent: true },
      { source: "/partners", destination: "/ecosystem", permanent: true },
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
