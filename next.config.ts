import type { NextConfig } from "next";
import { execSync } from "node:child_process";
const lastUpdated = execSync("git log -1 --format=%cd").toString().trim();

const nextConfig: NextConfig = {
  env: {
    LAST_UPDATED: lastUpdated,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
