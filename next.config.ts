import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next doesn't get confused
  // by other lockfiles higher up in the filesystem.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
