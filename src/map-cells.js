import CFG from './cfg'
import { el, canvas, bind, mix, load, color } from './helper'

export function MapCells() {
  const mc = {}
  return mix(mc, {
    map: [],
    mapDoneCb: () => {},
    canvas: null,
    ctx: null,
    statusEl: el(CFG.statusQuery),
    loadPathEl: el(CFG.imgUrlQuery),
    cellWidthEl: el(CFG.cellWidthQuery),
    cellHeightEl: el(CFG.cellHeightQuery),
    onImg: bind(onImg, mc),
    onErr: bind(onErr, mc),
    cellWidth: 0,
    cellHeight: 0,
    imgWidth: 0,
    imgHeight: 0
  })
}

export function onMapCells(mc, cb) {
  mc.map = []
  mc.mapDoneCb = cb
  load(mc.loadPathEl.value, mc.onImg, mc.OnErr)
}

function onErr(mc) {
  mc.statusEl.innerText = `Error loading: ${CFG.imgUrlQuery}`
}
  
function onImg(mc, e) {
  mc.canvas = canvas(e.target.width, e.target.height)
  mc.ctx = mc.canvas.getContext('2d')
  const img = e.target
  const map = mc.map
  let w = mc.cellWidth = +mc.cellWidthEl.value
  let h = mc.cellHeight = +mc.cellHeightEl.value
  mc.imgWidth = img.width
  mc.imgHeight = img.height
  if (img.width % w !== 0) {
    mc.statusEl.innerText = `Invalid cell width: ${w}. It should be multiple to image width`
    return
  }
  if (img.height % h !== 0) {
    mc.statusEl.innerText = `Invalid cell height: ${h}. It should be multiple to image height`
    return
  }
  mc.ctx.drawImage(img, 0, 0)
  for (let c = 0, cols = img.width / w; c < cols; c++) {
    for (let r = 0, rows = img.height / h; r < rows; r++) {
      const x = r * w
      const y = c * h
      map.push(...color(mc.ctx, null, x, y, x + w, y + h))
    }
  }
  mc.mapDoneCb()
}