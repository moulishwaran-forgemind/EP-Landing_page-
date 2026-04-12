import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const DIR = 'public/assets/transformations'
const SIZE = 256 // 2x of 128px display for retina

const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'))

for (const f of files) {
  const src = join(DIR, f)
  const dst = join(DIR, f.replace('.png', '.webp'))
  const before = (await stat(src)).size

  await sharp(src)
    .resize(SIZE, SIZE, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(dst)

  const after = (await stat(dst)).size
  const pct = ((1 - after / before) * 100).toFixed(1)
  console.log(`${f} -> ${dst.split(/[\\/]/).pop()}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (-${pct}%)`)
}
