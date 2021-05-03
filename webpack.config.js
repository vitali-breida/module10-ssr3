const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
           options: {
             presets: [
                 '@babel/preset-react'
             ],
           }
        }
      },
      {
        test: /\.css$/,
        use: [
           {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }      
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
        'title' : 'Mentoting program demo',
        'template' : './public/index.html'
    }),
    new webpack.ProvidePlugin({
        "React": "react"
     })
  ]
};