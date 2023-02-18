const { getCustomMediaConfig } = require('./src/styles/breakpoints');

module.exports = {
  plugins: {
    'postcss-custom-media': {
      importFrom: [getCustomMediaConfig],
    },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
};
