const Vibrant = require('node-vibrant')

const getVibrantColor = imgUrl =>
  Vibrant.from(imgUrl)
    .getPalette()
    .then(palette => {
      return palette.Vibrant._rgb
    })

module.exports = getVibrantColor
