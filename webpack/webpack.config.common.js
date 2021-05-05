const path = require('path');
const webpack = require('webpack');
const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve('./public'),
    libraryTarget : 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }  
    ]
  },
  plugins : [
    new webpack.ProvidePlugin({
        "React": "react"
     })
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};