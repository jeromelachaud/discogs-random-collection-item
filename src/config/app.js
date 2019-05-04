module.exports = {
  baseUrl:
    process.env.REACT_APP_NODE_ENV === 'production'
      ? `https://${process.env.REACT_APP_HOST}`
      : 'http://localhost:8080',
}
