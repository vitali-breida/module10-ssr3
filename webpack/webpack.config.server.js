const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const common = require('./webpack.config.common');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevMod = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  entry: './src/serverRenderer.js',
  externals: [nodeExternals()],
  output: {
    filename: 'js/serverRenderer.js',
    path: path.resolve('./public'),
    libraryTarget: 'commonjs2',
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
    // !isDevMod && new CleanWebpackPlugin(),
    isDevMod && new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ].filter(Boolean),  
});
