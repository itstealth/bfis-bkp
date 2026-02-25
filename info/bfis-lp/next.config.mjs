/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <--- Add this line
  basePath: '/info/admissions',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;
