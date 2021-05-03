const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve('./public'),
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
        'title' : 'Mentoring program demo',
        'template' : './src/index.html'
    }),
    new webpack.ProvidePlugin({
        "React": "react"
     }),
  ],
  /*optimization:{
    moduleIds : 'named'
  }*/
};