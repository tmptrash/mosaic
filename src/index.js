import './../index.css'
import CFG from './cfg'
import { ons, fn, mix, el, isInt, inf } from './helper'
import { Imgs, map as mapImgs } from './imgs'
import { Cells, map as mapCells } from './cells'
import { map as mapMosaic } from './mosaic'

const RULES = [
  [a => !isInt(a.cellWidthEl.value), a => `Invalid cell width: "${a.cellWidthEl.value}".`],
  [a => !isInt(a.cellHeightEl.value), a => `Invalid cell height: "${a.cellHeightEl.value}".`],
  [a => a.urlEl.value === '', a => `Error loading image: "${a.urlEl.value}".`]
]

function App() {
  const imgs = Imgs()
  const cells = Cells()
  const m = {}
  mix(m, {
    imgs,
    cells,
    cellWidthEl: el(CFG.cellWidthQuery),
    cellHeightEl: el(CFG.cellHeightQuery),
    urlEl: el(CFG.imgUrlQuery),
    listeners: [
      [CFG.genQuery, 'click', fn(onGenerate, m)],
      [CFG.downloadQuery, 'click', fn(onDownload, cells)]
    ]
  })
  ons(m.listeners)
  return m
}

function onGenerate(a) {
  if (!validate(a)) return
  try {
    const url = a.urlEl.value
    const server = (new URL(url)).origin
    const cw = +a.cellWidthEl.value
    const ch = +a.cellHeightEl.value
    if (!a.imgs.map.length) mapImgs(a.imgs, server)
      .then(fn(mapCells, a.cells, cw, ch, url))
      .then(fn(onCellsDone, a))
    else mapCells(a.cells, cw, ch, url)
     .then(fn(onCellsDone, a))
  } catch (e) {
    inf(e, true)
  }
}

function onDownload(cells) {
  if (!cells.map.length) {
    inf('Generate image first', true)
    return
  }
  const link = el(CFG.linkQuery)
  link.setAttribute('download', 'mosaic.png')
  link.setAttribute('href', el(CFG.canvasQuery).toDataURL().replace("image/png", "image/octet-stream"))
  link.click()
}

function onCellsDone(a) {
  mapMosaic(a.imgs, a.cells)
  inf(`Imgs used: ${a.imgs.imgs.length}`)
}

function validate(a) {
  for (let r of RULES) {
    if (r[0](a)) {
      inf(r[1](a), true)
      return false
    }
  }
  return true
}

//
// Entry point to the Photo Mosaic app
//
const app = App()