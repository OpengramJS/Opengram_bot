const winston = require('winston')
const { format, transports } = require('winston')
const { isProduction } = require('../config')

const logger = winston.createLogger({ level: 'info' })

if (!isProduction) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize({ all: true }),
        format.label({ label: '[LOGGER]' }),
        format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
        format.prettyPrint(),
        winston.format.printf(
          ({ level, message, label, timestamp, stack }) => {
            return ` ${label} ${timestamp} [${level}]: ${message}` + (stack ? '\n' + stack : '')
          }
        )
      )
    })
  )
} else {
  logger.add(
    new transports.File({
      filename: 'error.log',
      level: 'error'
    })
  )
  logger.add(
    new transports.File({ filename: 'combined.log' })
  )
}

module.exports = { logger }
