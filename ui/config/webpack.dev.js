const path = require('path');
const { merge } = require('webpack-merge')

const common = require('./webpack.common')
const {build} = require("./paths");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    static: path.join(__dirname, build),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000,
    devMiddleware: {
      index: "[name].html",
      writeToDisk: true
    },
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})
