const path = require('path')

module.exports = {
  entry: './dist/bundle.mjs',
  output: {
    filename: 'index.cjs',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node'
}
