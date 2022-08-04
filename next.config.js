const production = process.env.NODE_ENV == "production";

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/admin/dash", permanent: true },
    ]
  },
  compiler: {
    removeConsole: production,
    emotion: true,
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    WS_URL: process.env.WS_URL,
    WS_PATH: process.env.WS_PATH,
  }
};
