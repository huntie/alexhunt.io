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
  env: {
    SITE_NAME: 'Alex Hunt',
    SITE_URL: 'https://alexhunt.io',
    TWITTER_HANDLE: '@alxhnt',
  },
};
