import './../index.css'
import CFG from './cfg'
import { ons, fn, mix, el, isInt, log } from './helper'
import { Imgs, map as mapImgs } from './imgs'
import { Cells, map as mapCells } from './cells'
import { map as mapMosaic } from './mosaic'

const RULES = [
  [a => !isInt(a.cellWidthEl.value), a => `Invalid cell width: "${a.cellWidthEl.value}".`],
  [a => !isInt(a.cellHeightEl.value), a => `Invalid cell height: "${a.cellHeightEl.value}".`],
  [a => a.urlEl.value === '', a => `Error loading image: "${a.urlEl.value}".`]
]

function App() {
  const a = {}
  mix(a, {
    imgs: Imgs(),
    cells: Cells(),
    cellWidthEl: el(CFG.cellWidthQuery),
    cellHeightEl: el(CFG.cellHeightQuery),
    urlEl: el(CFG.imgUrlQuery),
    listeners: [
      [CFG.genQuery, 'click', fn(onGenerate, a)],
      [CFG.downloadQuery, 'click', fn(onDownload, a)]
    ]
  })
  ons(a.listeners)
  return a
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
    log(e, true)
  }
}

function onDownload(a) {
  if (!a.cells.map.length) {
    log('Generate image first', true)
    return
  }
  const link = el(CFG.linkQuery)
  link.setAttribute('download', 'mosaic.png')
  link.setAttribute('href', el(CFG.canvasQuery).toDataURL().replace("image/png", "image/octet-stream"))
  link.click()
}

function onCellsDone(a) {
  mapMosaic(a.imgs, a.cells)
  log(`Used: ${a.imgs.imgs.length} imgs`)
}

function validate(a) {
  for (let r of RULES) {
    if (r[0](a)) {
      log(r[1](a), true)
      return false
    }
  }
  return true
}

const app = App()