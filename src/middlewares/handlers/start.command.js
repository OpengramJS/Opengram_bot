const { Composer, Extra } = require('opengram')
const { mainKeyboard } = require('../../keyboards')

/** @param {OpengramContext} context **/
function handler (context) {
  return context.replyWithHTML(
    context.i18n.t('start.message'),
    Extra.markup(mainKeyboard(context))
      .webPreview(false)
      .HTML()
  )
}

module.exports = {
  startCommand: Composer.command('start', handler),
  handler
}
