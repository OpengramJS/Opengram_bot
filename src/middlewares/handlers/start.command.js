const { Composer } = require('opengram')
const { mainKeyboard } = require('../../keyboards')

/** @param {OpengramContext} context **/
function handler (context) {
  return context.replyWithHTML(context.i18n.t('mainMenu.message'), mainKeyboard(context))
}

module.exports = {
  startCommand: Composer.command('start', handler),
  handler
}
