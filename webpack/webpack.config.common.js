const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    !isDevMod && new CompressionPlugin({
      test: /\.js$/i,
      algorithm: 'gzip'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: (isDevMod ? 'inline-source-map' : 'source-map'),
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    hot: true
  },
  optimization: {
    moduleIds: isDevMod ? 'named' : 'size',
    splitChunks: {
      chunks: 'all'
    },
    chunkIds: isDevMod ? 'named' : 'size'
  }
};
