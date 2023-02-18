/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
  },
  async redirects() {
    return [
      {
        source: '/notes',
        destination: '/',
        permanent: false,
      },
    ];
  },
};
