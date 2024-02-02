import CFG from './cfg'
import { inf, canvas, fn, mix, load, color } from './helper'

export function Imgs() {
  const c = canvas()
  const imgs = {}
  return mix(imgs, {
    map: [],
    imgs: [],
    server: null,
    canvas: c,
    ctx: c.getContext('2d', { willReadFrequently: true }),
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
  const img = e.target
  inf(`Processed: n${imgs.file}.jpg`)
  imgs.canvas.width = img.width
  imgs.canvas.height = img.height
  imgs.map.push(...color(imgs.ctx, img))
  imgs.imgs.push(img)
  imgs.file++
  load(`${imgs.server}/n${imgs.file}.jpg`, imgs.onImg, imgs.onErr)
}