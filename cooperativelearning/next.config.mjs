/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Ensures strict mode is enabled
    experimental: {
      modern: true, // Use modern JavaScript by default
      polyfillsOptimization: false, // Disable polyfills optimization (could help with cache issues)
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
  