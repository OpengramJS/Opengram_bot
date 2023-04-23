const mongoose = require('mongoose')
const { logger } = require('./logger')
const { MONGODB_URI } = require('../config')

mongoose.connection
  .on('open', () => logger.info('Database connection: open'))
  .on('close', () => logger.info('Database connection: close'))
  .on('disconnected', () => logger.warn('Database connection: disconnecting'))
  .on('reconnectFailed', () => logger.error('Database connection: reconnect failed'))
  .on('reconnected', () => logger.info('Database connection: reconnected'))
  .on('fullsetup', () => logger.info('Database connection: fullsetup'))
  .on('all', () => logger.info('Database connection: all'))
  .on('error', error => logger.error('MongoDB connection: error', error))

mongoose.connect(MONGODB_URI)
