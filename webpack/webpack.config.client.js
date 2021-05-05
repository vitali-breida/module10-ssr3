const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = merge(common, {
  target: 'web',

  entry: [
    isDevMod && 'webpack-hot-middleware/client',
    './src/index.js',
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [
          /*isDevMod ? 'style-loader' : */MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: '[name]-[hash:5]',
            },
          },
        ],
      },
    ],
  },
  
  plugins: [
  /*  !isDevMod && new CleanWebpackPlugin(),
    isDevMod && new webpack.HotModuleReplacementPlugin()*/
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ].filter(Boolean),
});
