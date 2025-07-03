import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source:'/api/:path*',
        destination:'https://api.igdb.com/v4/:path*'
      }
    ]
  },
  images:{
    remotePatterns:[{
      protocol:'https',
      hostname:'images.igdb.com',
      pathname:'/igdb/image/upload/**'
    }]
  }
};

export default nextConfig;
