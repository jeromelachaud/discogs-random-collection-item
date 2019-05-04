// Env
require('dotenv').config()

// Server
const express = require('express')
const server = express()

// Cors
const cors = require('cors')
server.use(cors())

// Body parser
const bodyParser = require('body-parser')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// Logs
const morganBody = require('morgan-body')
morganBody(server)

// Declare file to serve static file
const path = require('path')
server.use(express.static(path.join(__dirname, '../build')))

// Routes declaration
const { getReleases, getRandomRelease } = require('./controller')
server.get('/ping', function(req, res) {
  return res.send('pong')
})
server.get('/releases', getReleases)
server.get('/release', getRandomRelease)
server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
server.get('/images', function(req, res) {
  res.sendFile(path.join(__dirname, 'images', 'cover.jpg'))
})

const models = require('../db/models')
const { postReleases } = require('./controller')
const schedule = require('node-schedule')
const fetchReleases = require('../services/fetch-releases')
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .then(async () => {
    schedule.scheduleJob('0 22 * * *', async () => {
      try {
        const releases = await fetchReleases()
        await postReleases(releases)
      } catch (err) {
        console.log("An error occured while importing the user's releases", err)
      }
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
module.exports = server
