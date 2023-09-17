import esbuild from 'esbuild'
import path from 'path'
import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const ctx = await esbuild.context({
  entryPoints: [path.join(__dirname, '../src/index.ts')],
  platform: 'node',
  bundle: true,
  outfile: path.join(__dirname, '../../../dist/bundle.mjs'),
  format: 'esm',
  sourcemap: true,
  loader: {
    '.node': 'copy'
  },

  banner: {
    js: `import * as url from 'url';const require = (await import("node:module")).createRequire(import.meta.url);const __filename = url.fileURLToPath(import.meta.url);const __dirname = url.fileURLToPath(new URL('.', import.meta.url));`
  }
})

await ctx.watch()
