const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = merge(common, {
  name : 'client',
  target: 'web',

  entry: [
    isDevMod && 'webpack-hot-middleware/client',
    './src/index.js',
  ].filter(Boolean),

  output: {
    filename: 'js/[name].js',
    path: path.resolve('./public')
  },  

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  
  plugins: [
    // new CleanWebpackPlugin(),
    isDevMod && new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new LoadablePlugin()
  ].filter(Boolean),
  
});
