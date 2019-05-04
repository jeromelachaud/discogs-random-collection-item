// Env
require('dotenv').config()

const PORT = process.env.PORT || 8080
const web = require('./api/server')

web
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
  .on('error', err => {
    console.log('ERROR: ', err)
  })
