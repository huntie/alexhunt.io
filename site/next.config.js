module.exports = {
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
