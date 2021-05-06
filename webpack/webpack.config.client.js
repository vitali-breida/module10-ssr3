const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = merge(common, {
  name : 'client',
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve('./public'),
    libraryTarget : 'commonjs2'
  },  

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [
          isDevMod ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  
  plugins: [
    /*!isDevMod && new CleanWebpackPlugin(),
    isDevMod && new webpack.HotModuleReplacementPlugin(),*/

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ].filter(Boolean),
});
