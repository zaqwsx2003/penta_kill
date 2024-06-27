// next.config.js

const nextConfig = {
    // output: "standalone",
    reactStrictMode: false,
    images: {
        // loader: "default",
        // loaderFile: "./lib/customImageLoader.ts",
        domains: ['static.lolesports.com', "3.34.67.203:3000", "penta-kill.store"],
        // format: ["image/png", "image/webp", "image/jpeg"],
    },
    experimental: {
        // missingSuspenseWithCSRBailout: false,
        // serverActions:true
      },
};

export default nextConfig;
