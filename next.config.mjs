/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stichtingimedi.nl",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
