import CFG from './cfg'
import { el, canvas, bind, mix, load, color, fl } from './helper'

export function MapCells() {
  const mc = {}
  return mix(mc, {
    map: [],
    mapDoneCb: () => {},
    canvas: null,
    ctx: null,
    statusEl: el(CFG.statusQuery),
    onImg: bind(onImg, mc),
    onErr: bind(onErr, mc),
    url: null,
    cellWidth: 0,
    cellHeight: 0,
    imgWidth: 0,
    imgHeight: 0
  })
}

export function onMapCells(mc, cw, ch, url, cb) {
  mc.url = url
  mc.cellWidth = cw
  mc.cellHeight = ch
  mc.map = []
  mc.mapDoneCb = cb
  load(url, mc.onImg, mc.OnErr)
}

function onErr(mc) {
  mc.statusEl.innerText = `Error loading: ${mc.url}`
}
  
function onImg(mc, e) {
  mc.canvas = canvas(e.target.width, e.target.height)
  mc.ctx = mc.canvas.getContext('2d')
  const img = e.target
  const map = mc.map
  let w = mc.cellWidth
  let h = mc.cellHeight
  mc.imgWidth = img.width
  mc.imgHeight = img.height
  mc.ctx.drawImage(img, 0, 0)
  for (let c = 0, cols = fl(img.width / w); c < cols; c++) {
    for (let r = 0, rows = fl(img.height / h); r < rows; r++) {
      const x = c * w
      const y = r * h
      map.push(...color(mc.ctx, null, x, y, w, h))
    }
  }
  mc.mapDoneCb()
}