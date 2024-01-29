import CFG from './cfg'
import { status, canvas, bind, mix, load, color } from './helper'

export function MapImgs() {
  const c = canvas(CFG.imgMaxWidth, CFG.imgMaxHeight)
  const mi = {}
  return mix(mi, {
    map: [],
    imgs: [],
    server: null,
    mapDoneCb: () => {},
    canvas: c,
    ctx: c.getContext('2d'),
    file: 0,
    onImg: bind(onImg, mi),
    onErr: bind(onErr, mi)
  })
}

export function onMapImgs(mi, server, cb) {
  mi.file = 0
  mi.map = []
  mi.imgs = []
  mi.mapDoneCb = cb
  mi.server = server
  load(`${server}/n${mi.file}.jpg`, mi.onImg, mi.OnErr)
}

function onErr(mi) {
  mi.mapDoneCb()
}
  
function onImg(mi, e) {
  status(`Processed: n${mi.file}.jpg`)
  mi.map.push(...color(mi.ctx, e.target))
  mi.imgs.push(e.target)
  mi.file++
  load(`${mi.server}/n${mi.file}.jpg`, mi.onImg, mi.onErr)
}