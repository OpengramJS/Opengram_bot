function i18nFactory (i18next) {
  /**
   * @param {OpengramContext} ctx
   * @param {Function} next Next mw
   * @return {Promise<void>}
   */
  async function i18nextMiddleware (ctx, next) {
    const userLocale = ctx.session?.locale ?? ctx.from.language_code

    const i18n = i18next.cloneInstance({ initImmediate: false, lng: userLocale })
    i18n.on('languageChanged', lng => {
      ctx.session.locale = lng
    })

    ctx.i18n = i18n
    await next()
  }

  return i18nextMiddleware
}

function match (resourceKey, templateData) {
  return (text, ctx) => {
    return (text && ctx?.i18n && text === ctx.i18n.t(resourceKey, templateData)) ? [text] : null
  }
}

module.exports = { i18nFactory, match }
