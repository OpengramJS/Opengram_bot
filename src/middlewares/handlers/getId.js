/**
 *
 * @param {OpengramContext} ctx
 * @return {Promise<Message>}
 */
const getId = async ctx => {
  if (!ctx.message) return
  const { forward_from_chat: forwardedFromChat, forward_from: forwardFrom, forward_signature: forwardSignature } = ctx.message

  let type = ''
  let id = 0

  if (forwardedFromChat) {
    type = forwardedFromChat.type + (forwardSignature ? type : '')
    id = forwardedFromChat.id
  } else if (forwardFrom) {
    type = forwardFrom.is_bot ? 'bot' : 'user'
    id = forwardFrom.id
  } else {
    type = 'user'
    id = ctx.from.id
  }

  return ctx.replyWithHTML(
    ctx.i18n.t('getId.text', {
      type,
      id,
      anonymous: forwardSignature ? ' ' + ctx.i18n.t('getId.anonymous', { name: forwardSignature }) : ''
    })
  )
}

module.exports = { getId }
