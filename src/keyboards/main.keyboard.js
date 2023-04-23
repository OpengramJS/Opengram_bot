const { Extra, Markup } = require('opengram')

const mainKeyboard = function createMainKeyboard (ctx) {
  return Markup.inlineKeyboard([
    Markup.urlButton(ctx.i18n.t('start.buttons.gitRepo'), 'https://github.com/OpengramJS/Opengram_bot'),
    Markup.urlButton(ctx.i18n.t('start.buttons.opengram'), 'https://github.com/OpengramJS/opengram'),
    Markup.switchToCurrentChatButton(ctx.i18n.t('start.buttons.inline'), '')
  ], { columns: 1 })
}

module.exports = { mainKeyboard }
