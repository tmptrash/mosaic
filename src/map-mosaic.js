import CFG from './cfg'
import { el, fl } from './helper'

export function MapMosaic(mc) {
  const canvas = el(CFG.canvasQuery)
  canvas.width = mc.imgWidth
  canvas.height = mc.imgHeight
  return {
    canvas
  }
}

export function map(mm, mi, mc) {
  const m = mc.map
  const ctx = mm.canvas.getContext('2d')
  const w = mc.cellWidth
  const h = mc.cellHeight
  const imgs = mi.imgs
  let i = 0
  for (let c = 0, cols = fl(mc.imgWidth / w); c < cols; c++) {
    for (let r = 0, rows = fl(mc.imgHeight / h); r < rows; r++) {
      const x = c * w
      const y = r * h
      const img = findImg(m[i], m[i + 1], m[i + 2], mi)
      ctx.drawImage(img, 0, 0, ...wh(w, h, img.width, img.height), x, y, w, h)
      i += 3
    }
  }
}

function findImg(r, g, b, mi) {
  let dist = -1
  let idx = -1
  const m = mi.map
  for (let i = 0, l = mi.map.length; i < l; i += 3) {
    const d = Math.sqrt((r - m[i])**2 + (g - m[i+1])**2 + (b - m[i+2])**2)
    if (idx === -1 || d < dist) dist = d, idx = i / 3
  }
  return mi.imgs[idx]
}

function wh(cw, ch, iw, ih) {
  const c1 = cw / ch
  const c2 = iw / ih
  return c1 >= c2 ? [iw, iw / c1] : [ih * c1, ih]
}