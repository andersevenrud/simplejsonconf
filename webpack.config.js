const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const minimize = mode === 'production';

module.exports = {
  mode,
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'index.js'),
  ],
  output: {
    library: 'simplejsonconf',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map',
    filename: '[name].js'
  },
  optimization: {
    minimize,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
