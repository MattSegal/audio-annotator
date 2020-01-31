const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./base.js')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
    publicPath: 'http://localhost:3000/static/',
    contentBase: [path.join(__dirname, '..', 'docs')],
    compress: true,
    port: 3000,
  },
  optimization: {
    minimize: false,
  },
  plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()],
}
