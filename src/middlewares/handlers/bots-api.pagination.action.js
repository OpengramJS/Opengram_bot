const { Composer } = require('opengram')
const { prepareResults } = require('../../lib/search')

const botsApiPaginationAction = Composer.action(/^(?:prev|next):([0-9]+):([a-fA-F0-9]{40})$/, async ctx => {
  const [, offset, id] = ctx.match

  const { objects, methods } = ctx.botsAPIReference

  const findMethod = methods.find(method => method.id === id)
  const findObject = objects.find(method => method.id === id)

  if (findObject || findMethod) {
    const isMethod = !!findMethod

    const [result] = prepareResults(
      ctx,
      [{ item: findMethod ?? findObject }],
      isMethod ? 0 : 1,
      +offset,
      15
    )

    await ctx.telegram.editMessageText(
      undefined,
      undefined,
      ctx.callbackQuery.inline_message_id,
      result.messageText,
      {
        parse_mode: result.parseMode,
        ...result.keyboard,
        disable_web_page_preview: true
      }
    )
  }
})

module.exports = { botsApiPaginationAction }
