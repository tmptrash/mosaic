import CFG from './cfg'
import { el, canvas, bind, mix, load, color } from './helper'

export function MapImg() {
  const mi = {}
  return mix(mi, {
    map: [],
    mapDoneCb: () => {},
    canvas: null,
    ctx: null,
    statusEl: el(CFG.statusQuery),
    loadPathEl: el(CFG.imgUrlQuery),
    cellSizeEl: el(CFG.cellSizeQuery),
    onImg: bind(onImg, mi),
    onErr: bind(onErr, mi)
  })
}

export function onMapImg(mi, cb) {
  mi.map = []
  mi.mapDoneCb = cb
  load(mi.loadPathEl.value, mi.onImg, mi.OnErr)
}

function onErr(mi) {
  mi.statusEl.innerText = `Error loading: ${CFG.imgUrlQuery}`
}
  
function onImg(mi, e) {
  mi.canvas = canvas(e.target.width, e.target.height)
  mi.ctx = mi.canvas.getContext('2d')
  const img = e.target
  const map = mi.map
  let w = +mi.cellSizeEl.value
  if (img.width % w !== 0 || img.height % w !== 0) {
    mi.statusEl.innerText = `Invalid cell size: ${w}. It should be multiple to image width & height`
    return
  }
  mi.ctx.drawImage(img, 0, 0)
  for (let c = 0, cols = img.width / w; c < cols; c++) {
    for (let r = 0, rows = img.height / w; r < rows; r++) {
      const x = r * w
      const y = c * w
      map.push(...color(mi.ctx, null, x, y, x + w, y + w))
    }
  }
  mi.canvas
}