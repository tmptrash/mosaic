import CFG from './cfg'
import { ons, bind } from './helper'
import { MapImgs, onMapImgs } from './map-imgs'
import { MapCells, onMapCells } from './map-cells'

export function Mosaic() {
  const mi = MapImgs()
  const mc = MapCells()
  const m = {
    mi,
    mc,
    listeners: [
      [CFG.mapQuery, 'click', bind(onMapImgs, mi, bind(onMapImgsDone, mi))],
      [CFG.loadQuery, 'click', bind(onMapCells, mc, bind(onMapCellsDone, mc))]
      //[window, 'message', e => e.data === 0 && (e.stopPropagation() || step())]
    ]
  }
  ons(m.listeners)
  return m
}

function onMapImgsDone(mi) {
  console.log('Map files done!')
}

function onMapCellsDone(mc) {
  console.log('Map cells done!')
}