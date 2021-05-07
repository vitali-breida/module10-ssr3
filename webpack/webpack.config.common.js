const path = require('path');
const webpack = require('webpack');
const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
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
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    hot: true
  },
  optimization : {
    moduleIds : isDevMod ? 'named' : 'deterministic'
  }
};