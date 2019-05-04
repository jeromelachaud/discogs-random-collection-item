const axios = require('axios')
const { baseUrl, apiKey } = require('../config/api').discogs

const fetchReleaseDetails = async id => {
  const options = {
    method: 'get',
    url: `${baseUrl}/releases/${id}`,
    headers: {
      Authorization: `Discogs token=${apiKey}`,
    },
  }
  try {
    const response = await axios(options)
    const { data } = response
    return data
  } catch (error) {
    return error.response.data
  }
}

module.exports = fetchReleaseDetails
