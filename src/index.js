require('dotenv').config()
const { connection } = require('./lib/database')
const { startBot } = require('./lib/bot')
const { logger } = require('./lib/logger')

async function main () {
  const bot = await startBot()
  let stopping = false
  async function stop () {
    if (stopping) return
    stopping = true
    logger.warn('Stopping bot...')
    await bot.stop()
    logger.warn('Bot stopped...')
    logger.warn('Close DB connection...')
    await connection.close()
    logger.warn('DB Connection closed...')
    process.exit(0)
  }

  // Enable graceful stop
  process.once('SIGINT', () => stop())
  process.once('SIGTERM', () => stop())
}

main()
