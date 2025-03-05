/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Ensures strict mode is enabled
    experimental: {
      
      
    },
    webpack: (config, { isServer }) => {
      // Example: Disable cache for development mode
      if (!isServer) {
        config.cache = false;
      }
      return config;
    },
  };
  
  export default nextConfig;
  