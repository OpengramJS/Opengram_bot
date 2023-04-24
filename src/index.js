require('dotenv').config()
const { connection } = require('./lib/database')
const { startBot } = require('./lib/bot')
const { logger } = require('./lib/logger')
const { isTelegramError } = require('opengram')

function errorHandler (err) {
  if (isTelegramError(err)) {
    logger.error('Bot error:', err)
    return
  }

  throw err
}

async function main () {
  const bot = await startBot(errorHandler)
  let stopping = false
  async function stop (code = 0) {
    if (stopping) return
    stopping = true
    logger.warn('Stopping bot...')
    await bot.stop()
    logger.warn('Bot stopped...')
    logger.warn('Close DB connection...')
    await connection.close()
    logger.warn('DB Connection closed...')
    process.exit(code)
  }

  // Enable graceful stop
  process.once('uncaughtException', err => {
    if (isTelegramError(err)) {
      logger.error('Bot error:', err)
      return
    }

    logger.error('Unhandled exception, stop...', err)
    stop(1)
  })
  process.once('unhandledRejection', err => {
    if (isTelegramError(err)) {
      logger.error('Bot error:', err)
      return
    }

    logger.error('Unhandled rejection, stop...', err)
    stop(1)
  })
  process.once('SIGINT', () => stop())
  process.once('SIGTERM', () => stop())
}

main()
