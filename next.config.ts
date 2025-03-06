import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        hostname: 'plus.unsplash.com',
        protocol: 'https',
        port: '',
        pathname: "/**"
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https',
        port: '',
        pathname: "/**"
      },
      {
        hostname: 'ucarecdn.com',
        protocol: 'https',
        port: '',
        pathname: "/**"
      },
      {
        hostname: 'placehold.co',
        protocol: 'https',
        port: '',
        pathname: "/**"
      },
      {
        hostname: 'placeimg.com',
        protocol: 'https',
        port: '',
        pathname: "/**"
      },
      {
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        protocol: 'https',
        port: '',
        pathname: "/**"
      },
    ]
  }
};

export default nextConfig;
