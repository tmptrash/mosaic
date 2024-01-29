import CFG from './cfg'
import { ons, bind, mix, el, isInt, status } from './helper'
import { MapImgs, onMapImgs } from './map-imgs'
import { MapCells, onMapCells } from './map-cells'
import { MapMosaic, map } from './map-mosaic'

const RULES = [
  [m => !isInt(m.cellWidthEl.value), m => `Invalid cell width: "${m.cellWidthEl.value}".`],
  [m => !isInt(m.cellHeightEl.value), m => `Invalid cell height: "${m.cellHeightEl.value}".`],
  [m => m.imgPathEl.value === '', m => `Error loading image: "${m.imgPathEl.value}".`]
]

export function Mosaic() {
  const mi = MapImgs()
  const mc = MapCells()
  const m = {}
  mix(m, {
    mi,
    mc,
    mm: null,
    cellWidthEl: el(CFG.cellWidthQuery),
    cellHeightEl: el(CFG.cellHeightQuery),
    imgPathEl: el(CFG.imgUrlQuery),
    listeners: [
      [CFG.genQuery, 'click', bind(onGenerate, m)],
      [CFG.downloadQuery, 'click', onDownload]
    ]
  })
  ons(m.listeners)
  return m
}

function onGenerate(m) {
  if (!checkInputs(m)) return
  const url = m.imgPathEl.value
  const server = (new URL(url)).origin
  const cw = +m.cellWidthEl.value
  const ch = +m.cellHeightEl.value
  // TODO: think about this code
  const cb = bind(onMapCellsDone, m)
  if (!m.mi.map.length) onMapImgs(m.mi, server, bind(onMapCells, m.mc, cw, ch, url, cb))
  else onMapCells(m.mc, cw, ch, url, cb)
}

function onMapCellsDone(m) {
  m.mm = MapMosaic(m.mc)
  map(m.mm, m.mi, m.mc)
  status('')
}

function checkInputs(m) {
  for (let r of RULES) {
    if (r[0](m)) {
      status(r[1](m))
      return false
    }
  }
  return true
}

function onDownload() {
  const link = el(CFG.linkQuery)
  link.setAttribute('download', 'mosaic.png')
  link.setAttribute('href', el(CFG.canvasQuery).toDataURL().replace("image/png", "image/octet-stream"))
  link.click()
}