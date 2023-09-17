import esbuild from 'esbuild'
import path from 'path'
import url from 'url'
import webpack from 'webpack'

import webpackConfig from '../webpack.config.cjs'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

await esbuild.build({
  entryPoints: [path.join(__dirname, '../src/index.ts')],
  platform: 'node',
  bundle: true,
  outfile: path.join(__dirname, '../../../dist/bundle.mjs'),
  format: 'esm',
  sourcemap: true,
  loader: {
    '.node': 'copy'
  }
})

const compiler = webpack(webpackConfig)

compiler.run(() => {
  compiler.close(() => {})
})
