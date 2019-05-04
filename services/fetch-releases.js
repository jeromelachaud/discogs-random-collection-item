const axios = require('axios')
const { baseUrl, apiKey, username } = require('../config/api').discogs

const fetchReleases = async () => {
  const options = {
    method: 'get',
    headers: {
      Authorization: `Discogs token=${apiKey}`,
    },
  }

  try {
    let numberOfItems = await axios({
      ...options,
      url: `${baseUrl}/users/${username}/collection/folders/0/releases`,
    })
    numberOfItems = numberOfItems.data.pagination.items
    console.log(numberOfItems)
    let releases = await axios({
      ...options,
      url: `${baseUrl}/users/${username}/collection/folders/0/releases?per_page=${numberOfItems}&page=1`,
    })
    // eslint-disable-next-line prefer-destructuring
    releases = releases.data.releases
    console.log(releases)
    return releases
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}

module.exports = fetchReleases
