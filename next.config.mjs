// next.config.js

const nextConfig = {
    images: {
        domains: ['static.lolesports.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
