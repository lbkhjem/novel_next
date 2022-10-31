
const moduleExports = {
  reactStrictMode: true,
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },


  images: {
    domains: ['avatar.novelonlinefree.com', 'novelonlinefree.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
module.exports = moduleExports
