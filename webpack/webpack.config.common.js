const path = require('path');
const webpack = require('webpack');
const isDevMod = process.env.NODE_ENV === 'development';
// const LoadablePlugin = require('@loadable/webpack-plugin')
//__webpack_public_path__ = 'public'

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
     }),
    //  new LoadablePlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool : 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    hot: true
  },
  optimization : {
    // moduleIds : isDevMod ? 'named' : 'size',
    // splitChunks : {
    //   chunks : 'all'
    // },
    // chunkIds : isDevMod ? 'named' : 'size',
  }
};