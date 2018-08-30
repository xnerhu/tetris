const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');
const baseConfig = require('./webpack.config.base');

const config = merge.smart(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        use: ['url-loader'],
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new CopyWebpackPlugin([
      {
        from: 'static/pages/*',
        flatten: true,
      },
    ]),
  ],
});

const appConfig = merge.smart(config, {
  target: 'web',

  entry: {
    app: ['./src/renderer/app'],
  },
});

module.exports = [appConfig];
