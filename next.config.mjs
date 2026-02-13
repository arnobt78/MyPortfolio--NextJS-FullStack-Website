import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "orcid.org", pathname: "/**" },
      { protocol: "https", hostname: "websitelaunches.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "arnob-mahmud.vercel.app" }],
        destination: "https://www.arnobmahmud.com/:path*",
        permanent: true, // 308 - tells Google this is the canonical URL
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "arnobmahmud.com" }],
        destination: "https://www.arnobmahmud.com/:path*",
        permanent: true, // 308 - tells Google this is the canonical URL
      },
    ];
  },
};

export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);
