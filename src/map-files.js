import CFG from './cfg'
import { el, canvas, bind, mix, load, color } from './helper'

export function MapFiles() {
  const c = canvas(CFG.imgMaxWidth, CFG.imgMaxHeight)
  const mf = {}
  return mix(mf, {
    map: [],
    imgs: [],
    mapDoneCb: () => {},
    canvas: c,
    ctx: c.getContext('2d'),
    file: 0,
    onImg: bind(onImg, mf),
    onErr: bind(onErr, mf),
    statusEl: el(CFG.statusQuery)
  })
}

export function onMapFiles(mf, cb) {
  mf.file = 0
  mf.map = []
  mf.imgs = []
  mf.mapDoneCb = cb
  load(`${CFG.fileServer}${mf.file}.png`, mf.onImg, mf.OnErr)
}

function onErr(mf) {
  mf.mapDoneCb()
}
  
function onImg(mf, e) {
  mf.statusEl.innerText = `Processed: ${mf.file}.png`
  mf.map.push(...color(mf.ctx, e.target))
  mf.imgs.push(e.target)
  mf.file++
  load(`${CFG.fileServer}${mf.file}.png`, mf.onImg, mf.onErr)
}