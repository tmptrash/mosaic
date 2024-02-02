import CFG from './cfg'

export function load(path, cb, errCb) {
  const img = new Image()
  img.onload = cb
  img.onerror = errCb
  img.src = path
  img.crossOrigin = 'Anonymous'
  img.load && img.load()
}

export function on(elem, event, handler) {
  (typeof elem === 'string' ? el(elem) : elem).addEventListener(event, handler, {passive: false})
}

export function ons(listeners) {
  listeners && listeners.forEach(l => on(l[0], l[1], l[2]))
}

export function el(query) {
  return document.querySelector(query)
}

export function canvas(w = 1024, h = 1024) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return canvas
}

export function mix(o1, o2) {
  return Object.assign(o1, o2)
}

export function fn(fn, ...args) {
  return fn.bind(null, ...args)
}

export function color(ctx, img, x = 0, y = 0, w = -1, h = -1) {
  w = w === -1 ? img.width  : w
  h = h === -1 ? img.height : h
  let r = 0, g = 0, b = 0
  img && ctx.drawImage(img, 0, 0)
  const d = ctx.getImageData(x, y, w, h).data
  let l = d.length
  for (let i = 0; i < l; i += 4) {
    r += d[i]
    g += d[i + 1]
    b += d[i + 2]
  }
  l /= 4
  return [fl(r / l), fl(g / l), fl(b / l)]
}

export const fl = Math.floor

export function isInt(n) {
  return Number.isInteger(parseInt(n))
}

export function inf(s, err = false) {
  const infEl = el(CFG.statusQuery)
  infEl.innerText = s
  infEl.className = (err ? 'err' : '')
}