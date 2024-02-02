import CFG from './cfg'
import { el, fl } from './helper'

export function map(imgs, cells) {
  const canvas = el(CFG.canvasQuery)
  canvas.width = cells.imgWidth
  canvas.height = cells.imgHeight
  const map = cells.map
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const w = cells.cellWidth
  const h = cells.cellHeight
  let i = 0
  for (let c = 0, cols = fl(cells.imgWidth / w); c < cols; c++) {
    for (let r = 0, rows = fl(cells.imgHeight / h); r < rows; r++) {
      const x = c * w
      const y = r * h
      const img = findImg(map[i], map[i + 1], map[i + 2], imgs)
      ctx.drawImage(img, 0, 0, ...wh(w, h, img.width, img.height), x, y, w, h)
      i += 3
    }
  }
}

function findImg(r, g, b, imgs) {
  let dist = -1
  let idx = -1
  const m = imgs.map
  for (let i = 0, l = imgs.map.length; i < l; i += 3) {
    const d = Math.sqrt((r - m[i])**2 + (g - m[i + 1])**2 + (b - m[i + 2])**2)
    if (idx === -1 || d < dist) dist = d, idx = i / 3
  }
  return imgs.imgs[idx]
}

function wh(cw, ch, iw, ih) {
  const c1 = cw / ch
  const c2 = iw / ih
  return c1 >= c2 ? [iw, iw / c1] : [ih * c1, ih]
}