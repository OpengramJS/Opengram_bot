const { mainKeyboard } = require('../../keyboards')

/** @param {OpengramContext} context **/
function handler (context) {
  if (context.callbackQuery) return
  return context.replyWithHTML(context.i18n.t('unmatched.message'), mainKeyboard(context))
}

module.exports = {
  unmatchedHandler: handler
}
