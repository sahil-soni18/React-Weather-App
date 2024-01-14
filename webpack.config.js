const webpack = require('webpack');

module.exports = {
  // Your existing webpack configuration options...

  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      http: require.resolve('stream-http'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      url: require.resolve('url/'),
    }
  },

  plugins: [
    // Other plugins...
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
