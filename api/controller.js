const { Release, sequelize } = require('../db/models')
const mailer = require('../lib/mailer')
const getVibrantColor = require('../lib/get-vibrant-color')
const fetchReleaseDetails = require('../services/fetch-release-details')
const downloadImage = require('../services/download-image')
const setTextColor = require('../lib/set-text-color')

const getReleases = async (req, res) => {
  try {
    const releases = await Release.findAll()
    res.status(200).send(releases)
  } catch (error) {
    res.status(500).send({ error: 'an error occured' })
  }
}

const postReleases = async releases => {
  try {
    const updatedReleases = await Promise.all(
      releases.map(element =>
        Release.findOrCreate({
          where: {
            discogs_id: element.id,
          },
        })
      )
    )
    const amountOfAddedReleases = updatedReleases
      .map(item => ({
        id: item[0].dataValues.discogs_id,
        created: item[1],
      }))
      .filter(release => release.created === true).length
    console.log(amountOfAddedReleases)
    if (amountOfAddedReleases > 0) {
      mailer(amountOfAddedReleases)
    } else {
      return updatedReleases
    }
    return updatedReleases
  } catch (error) {
    console.log(error)
    return error
  }
}

const getRandomRelease = async (req, res) => {
  try {
    const randomRelease = await Release.findOne({
      order: [sequelize.fn('RANDOM')],
    })
    const release = await fetchReleaseDetails(randomRelease.discogs_id)
    await downloadImage(release.images[0].uri)
    const bgColor = await getVibrantColor('./api/images/cover.jpg')
    const textColor = setTextColor(bgColor)
    res.status(200).send({
      release,
      color: {
        bgColor,
        textColor,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getReleases, postReleases, getRandomRelease }
