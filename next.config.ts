import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// GitHub Pages serves the site from /<repo>/, so assets and links need a base path in CI.
const basePath = process.env.GITHUB_ACTIONS ? "/Th3-Beat-Boutique" : "";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  turbopack: {}, // silence the turbopack/webpack conflict warning
  output: "export",
  basePath,
  trailingSlash: true, // /kits/ -> kits/index.html, which GitHub Pages serves directly
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default withPWA(nextConfig);
