export const generateFileName = () => {
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getUTCDate()).slice(-2)

  const random = Math.floor(Math.random() * 1e5)
  const filename = `IMG_${year + month + day}_${random}.jpg`

  return filename
}
