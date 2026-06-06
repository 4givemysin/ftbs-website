import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about/capabilities",
        destination: "/capability-statement",
        permanent: true,
      },
      {
        source: "/about/certifications",
        destination: "/certifications",
        permanent: true,
      },
      {
        source: "/about/company-profile",
        destination: "/company-profile",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/case-studies",
        permanent: false,
      },
      {
        source: "/divisions/bgw-construction",
        destination: "/bgw",
        permanent: true,
      },
      {
        source: "/divisions/bgw-construction/:path*",
        destination: "/bgw/:path*",
        permanent: true,
      },
      {
        source: "/divisions",
        destination: "/bgw",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
