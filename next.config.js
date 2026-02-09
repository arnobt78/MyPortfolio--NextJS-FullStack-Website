/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
