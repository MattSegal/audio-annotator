const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./base.js')

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: __dirname + '/docs/static',
    filename: 'main.js',
  },
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })],
  },
  plugins: [...baseConfig.plugins],
}
