const { Composer } = require('opengram')

/**
 * handler for command !src.
 * Prints source of a replayed message
 * @param {OpengramContext} ctx
 * @return {Promise}
 */

const srcCommand = Composer.hears(/^!src$/, async (ctx) => {
  const targetMessage = ctx.message.reply_to_message
  if (targetMessage) {
    try {
      await ctx.replyWithHTML(`<pre>${JSON.stringify(targetMessage, null, 2)}</pre>`)
    } catch (e) {
      if (e.description.includes('message is too long')) {
        return ctx.replyWithHTML(ctx.i18n.t('src.originTooLong'))
      }
      throw e
    }
  }
})

module.exports = { srcCommand }
