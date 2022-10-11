export const getBase64Image = (img: HTMLImageElement | undefined) => {
  if (!img) return undefined
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  if (!ctx) return undefined
  ctx.drawImage(img, 0, 0)
  var dataURL = canvas.toDataURL('image/png')
  return dataURL
}
