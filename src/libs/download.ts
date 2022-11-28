import { Buffer } from 'buffer'
import { generateFileName } from './filename'

export const download = (svg: SVGSVGElement) => {
  let svgData = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  const svgSize = svg.getBoundingClientRect()
  canvas.width = svgSize.width
  canvas.height = svgSize.height
  const img = document.createElement('img')
  img.setAttribute(
    'src',
    'data:image/svg+xml;base64,' + Buffer.from(svgData).toString('base64')
  )
  img.onload = function () {
    canvas.getContext('2d')?.drawImage(img, 0, 0)
    const canvasdata = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.download = generateFileName()
    a.href = canvasdata
    document.body.appendChild(a)
    a.click()
  }
}
