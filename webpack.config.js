const path = require('path');
const glob = require('glob');

// Make entry points
function dynamicEntryPoints(globPath, removePrefix) {
  return glob.sync(globPath).reduce((acc, item) => {
    const name = item.replace(removePrefix, '').replace('.js', '');
    acc[name] = item;
    return acc;
  }, {});
}


module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    ...dynamicEntryPoints('./_js/**/[^_]*.js', './_js/')
  },
  output: {
    clean: true,
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
        use: 'svelte-loader'
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ]
  }
};
