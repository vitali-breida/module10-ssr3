const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.common');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDevMod = process.env.NODE_ENV === 'development';

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  entry: './src/ServerRenderer.jsx',
  externals: [nodeExternals()],
  output: {
    filename: 'js/serverRenderer.js',
    path: path.resolve('./public'),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  plugins: [
    // new CleanWebpackPlugin(),
    isDevMod && new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ].filter(Boolean)
});
