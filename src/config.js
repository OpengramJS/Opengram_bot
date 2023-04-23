const { BOT_TOKEN, MONGODB_URI, DROP_PENDING_ON_START } = process.env

module.exports = {
  BOT_TOKEN,
  MONGODB_URI,
  DROP_PENDING_ON_START,
  isProduction: process.env.NODE_ENV && process.env.NODE_ENV !== 'development'
}
