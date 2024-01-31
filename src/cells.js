import { inf, canvas, fn, mix, load, color, fl } from './helper'

export function Cells() {
  const cells = {}
  return mix(cells, {
    map: [],
    canvas: null,
    ctx: null,
    onImg: fn(onImg, cells),
    onErr: fn(onErr, cells),
    url: null,
    cellWidth: 0,
    cellHeight: 0,
    imgWidth: 0,
    imgHeight: 0,
    ok: null,
    err: null
  })
}

export function map(cells, cw, ch, url) {
  inf('Generating final image...')
  cells.url = url
  cells.cellWidth = cw
  cells.cellHeight = ch
  cells.map = []
  load(url, cells.onImg, cells.OnErr)
  return new Promise((ok, err) => {
    cells.ok = ok
    cells.err = err
  })
}

function onErr(cells) {
  inf(`Error loading: ${cells.url}`)
  cells.err()
}
  
function onImg(cells, e) {
  cells.canvas = canvas(e.target.width, e.target.height)
  cells.ctx = cells.canvas.getContext('2d')
  const img = e.target
  const map = cells.map
  let w = cells.cellWidth
  let h = cells.cellHeight
  cells.imgWidth = img.width
  cells.imgHeight = img.height
  cells.ctx.drawImage(img, 0, 0)
  for (let c = 0, cols = fl(img.width / w); c < cols; c++) {
    for (let r = 0, rows = fl(img.height / h); r < rows; r++) {
      const x = c * w
      const y = r * h
      map.push(...color(cells.ctx, null, x, y, w, h))
    }
  }
  cells.ok()
}