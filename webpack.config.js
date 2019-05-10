const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: './_js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true
          },
        },
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  }
};
