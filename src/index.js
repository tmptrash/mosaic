import './../index.css'
import CFG from './cfg'
import { ons, fn, mix, el, isInt, inf } from './helper'
import { Imgs, map as mapImgs } from './imgs'
import { Cells, map as mapCells } from './cells'
import { map as mapMosaic } from './mosaic'

const RULES = [
  [a => !isInt(a.cellWidthEl.value), a => `Invalid cell width: "${a.cellWidthEl.value}".`],
  [a => !isInt(a.cellHeightEl.value), a => `Invalid cell height: "${a.cellHeightEl.value}".`],
  [a => a.imgPathEl.value === '', a => `Error loading image: "${a.imgPathEl.value}".`]
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
    imgPathEl: el(CFG.imgUrlQuery),
    listeners: [
      [CFG.genQuery, 'click', fn(onGenerate, m)],
      [CFG.downloadQuery, 'click', onDownload]
    ]
  })
  ons(m.listeners)
  return m
}

function onGenerate(a) {
  if (!checkInputs(a)) return
  const url = a.imgPathEl.value
  const server = (new URL(url)).origin
  const cw = +a.cellWidthEl.value
  const ch = +a.cellHeightEl.value
  if (!a.imgs.map.length) mapImgs(a.imgs, server)
    .then(fn(mapCells, a.cells, cw, ch, url))
    .then(fn(onCellsDone, a))
  else mapCells(a.cells, cw, ch, url)
    .then(fn(onCellsDone, a))
}

function onCellsDone(a) {
  mapMosaic(a.imgs, a.cells)
  inf(`Imgs: ${a.imgs.imgs.length}`)
}

function checkInputs(a) {
  for (let r of RULES) {
    if (r[0](a)) {
      inf(r[1](a))
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

//
// Entry point to the Photo Mosaic app
//
const app = App()