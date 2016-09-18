var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './public/index'
  ],
  output: {
    path: path.join(__dirname, './public/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /.js?$/,
        include: path.join(__dirname, 'public'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },

      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      }
    ]
  }
};