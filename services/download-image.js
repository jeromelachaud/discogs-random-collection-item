const axios = require('axios')
const Fs = require('fs')
const Path = require('path')
const { apiKey } = require('../config/api').discogs

async function downloadImage(url) {
  const path = Path.resolve(__dirname, '../api/images', 'cover.jpg')
  const writer = Fs.createWriteStream(path)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    headers: {
      Authorization: `Discogs token=${apiKey}`,
    },
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve, console.log('finish'))
    writer.on('error', reject)
  })
}
module.exports = downloadImage
