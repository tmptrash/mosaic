import CFG from './cfg'
import { ons, bind } from './helper'
import { onMapFiles, MapFiles } from './map-files'
import { onMapImg, MapImg } from './map-img'

export function Mosaic() {
  const mf = MapFiles()
  const mi = MapImg()
  const m = {
    mf,
    mi,
    listeners: [
      [CFG.mapQuery, 'click', bind(onMapFiles, mf, bind(onMapFilesDone, mf))],
      [CFG.loadQuery, 'click', bind(onMapImg, mi, bind(onMapImgDone, mi))]
      //[window, 'message', e => e.data === 0 && (e.stopPropagation() || step())]
    ]
  }
  ons(m.listeners)
  return m
}

function onMapFilesDone(mf) {
  console.log('Map files done!')
}

function onMapImgDone(mi) {
  console.log('Map img done!')
}