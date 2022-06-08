/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    WS_URL: process.env.WS_URL,
    WS_PATH: process.env.WS_PATH,
  }
};
