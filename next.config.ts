import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "choozlandscapers.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
    dangerouslyAllowSVG: true,
  },

  async redirects() {
    return [
      // Redirect old contractor routes → new pattern
      {
        source: "/contractor/:state/:city/:slug",
        destination: "/painting-contractor/:state/:city/:slug",
        permanent: true, // 308 (permanent redirect)
      },
      // Redirect www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.choozlandscapers.com" }],
        destination: "https://choozlandscapers.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
