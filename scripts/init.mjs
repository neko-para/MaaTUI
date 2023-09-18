import fs from 'fs/promises'

await fs.mkdir('dist', { recursive: true })
await fs.copyFile('node_modules/yoga-wasm-web/dist/yoga.wasm', 'dist/yoga.wasm')
