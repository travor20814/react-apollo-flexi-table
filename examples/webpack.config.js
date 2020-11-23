// @flow

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'entry.jsx'),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: __dirname,
    publicPath: '/',
    compress: true,
    port: 5334,
    filename: 'bundle.js',
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  target: 'web',
  resolve: {
    mainFields: [
      'browser',
      'main',
      'module',
    ],
    extensions: [
      '.jsx',
      '.js',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader',
      ],
    }],
  },
};
