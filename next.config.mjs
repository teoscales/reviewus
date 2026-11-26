/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/portfolio", destination: "/portfolio/index.html" }];
  },
};

export default nextConfig;