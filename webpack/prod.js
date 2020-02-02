const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./base.js')

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: path.join(__dirname, '..', '/docs/static'),
    filename: 'main.js',
  },
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: false })],
  },
  plugins: [...baseConfig.plugins],
}
