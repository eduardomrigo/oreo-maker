/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    distDir: 'dist',
    trailingSlash: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.(mp3|wav|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[path][name].[ext]',
            },
          },
        ],
      });
      
      return config;
    },
  }
  
  module.exports = nextConfig;
  