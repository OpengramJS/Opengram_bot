const { Composer } = require('opengram')
const { startCommand } = require('./start.command')
const { unmatchedHandler } = require('./unmatched')
const { inlineQuery } = require('./inline-query')
const { srcCommand } = require('./src.command')
const { mediaGroup } = require('./media-group')
const { getId } = require('./getId')
const { botsApiPaginationAction } = require('./bots-api.pagination.action')

module.exports = {
  handlers: new Composer(
    srcCommand,
    mediaGroup,
    botsApiPaginationAction,
    inlineQuery,
    Composer.privateChat(startCommand, getId),
    unmatchedHandler
  )
}
