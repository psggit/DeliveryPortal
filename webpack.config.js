var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    dropdown: [
      'webpack-hot-middleware/client',
      './src'
    ]
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'bundle.js',
    publicPath: '/cdn/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass",
        exclude: /node_modules/
      }
  ]
  }
};
