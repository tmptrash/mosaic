import CFG from './cfg'

export function MapMosaic(mi, mc) {
  const canvas = el(CFG.canvasQuery)
  canvas.width = mc.w
  canvas.height = mc.h
  return {
    canvas,
    mi,
    mc
  }
}

export function map(mm) {
  const ctx = mm.canvas.getContext('2d')
  const w = mm.mc.cellWidth
  const h = mm.mc.cellHeight
  const imgs = mm.mi.imgs
  for (let c = 0, cols = mm.mc.imgWidth / w; c < cols; c++) {
    for (let r = 0, rows = mm.mc.imgHeight / h; r < rows; r++) {
      const x = r * w
      const y = c * h
      const img = imgs[0] // TODO:
      ctx.drawImage(img, 0, 0, ...wh(w, h, img.width, img.height), x, y, w, h)
    }
  }
}

function wh(cw, ch, iw, ih) {
  const c1 = cw / ch
  const c2 = iw / ih
  return c1 >= c2 ? [iw, iw / c1] : [ih * c1, ih]
}