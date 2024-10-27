/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/signout',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;