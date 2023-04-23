const { BOT_TOKEN, MONGODB_URI } = process.env

module.exports = {
  BOT_TOKEN,
  MONGODB_URI,
  isProduction: process.env.NODE_ENV && process.env.NODE_ENV !== 'development'
}
