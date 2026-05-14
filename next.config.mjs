import { withSentryConfig } from "@sentry/nextjs";

/** Root `postcss` in package.json + `"overrides": { "postcss": "$postcss" }` dedupe Next’s nested PostCSS to a patched 8.5.x (npm audit clean). */

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
    // Tunnel Sentry through our domain so ad blockers don't block it
    tunnelRoute: "/monitoring",
  },
  {
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);
