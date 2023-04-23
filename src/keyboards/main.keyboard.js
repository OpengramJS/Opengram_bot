const { Extra, Markup } = require('opengram')

const mainKeyboard = function createMainKeyboard (ctx) {
  return Extra.markup(m => {
    return m.keyboard([
      Markup.button(ctx.i18n.t('keyboard.main.createStickers')),
      Markup.button(ctx.i18n.t('keyboard.main.back'))
    ], { columns: 1 })
      .resize()
  })
}

module.exports = { mainKeyboard }
