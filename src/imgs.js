import CFG from './cfg'
import { status, canvas, fn, mix, load, color } from './helper'

export function Imgs() {
  const c = canvas(CFG.imgMaxWidth, CFG.imgMaxHeight)
  const imgs = {}
  return mix(imgs, {
    map: [],
    imgs: [],
    server: null,
    canvas: c,
    ctx: c.getContext('2d'),
    file: 0,
    onImg: fn(onImg, imgs),
    onErr: fn(onErr, imgs),
    ok: null,
    err: null
  })
}

export function map(imgs, server) {
  imgs.file = 0
  imgs.map = []
  imgs.imgs = []
  imgs.server = server
  load(`${server}/n${imgs.file}.jpg`, imgs.onImg, imgs.OnErr)
  return new Promise((ok, err) => {
    imgs.ok = ok
    imgs.err = err
  })
}

function onErr(imgs) {
  imgs.ok()
}

function onImg(imgs, e) {
  status(`Processed: n${imgs.file}.jpg`)
  imgs.map.push(...color(imgs.ctx, e.target))
  imgs.imgs.push(e.target)
  imgs.file++
  load(`${imgs.server}/n${imgs.file}.jpg`, imgs.onImg, imgs.onErr)
}