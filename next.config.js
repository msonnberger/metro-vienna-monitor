const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: false,
  assetPrefix: isProd
    ? 'https://projects.msonnberger.com/metro-vienna-monitor'
    : '',
};
