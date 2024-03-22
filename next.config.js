/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pro.openweathermap.org",
      },
    ],
  },
};

module.exports = nextConfig;
