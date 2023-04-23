const { Opengram, session } = require('opengram')
const { MediaGroup } = require('@opengram/media-group')
const { BOT_TOKEN, isProduction, DROP_PENDING_ON_START } = require('../config')
const { handlers } = require('../middlewares/handlers')
const { logger } = require('./logger')
const { stage } = require('../middlewares/stage')
const { authorization } = require('../middlewares/authorization')
const { StickerSet, User } = require('./models')
const { i18nFactory } = require('../middlewares/i18n')
const i18next = require('i18next')
const fetch = require('node-fetch')
const { sha1 } = require('./utils')

const bot = new Opengram(BOT_TOKEN)

bot.context.model = {
  User,
  StickerSet
}

async function startBot () {
  bot.context.loadBotsAPIReference = async function () {
    const data = await fetch('https://ark0f.github.io/tg-bot-api/custom.json')
      .then(x => x.json())

    data.objects.forEach((v, i) => {
      data.objects[i].__object = true
      data.objects[i].id = sha1([v.name, 'type'].join())
    })

    data.methods.forEach((v, i) => {
      data.methods[i].__method = true
      data.methods[i].id = sha1([v.name, 'method'].join())
    })

    bot.context.botsAPIReference = data
  }

  await bot.context.loadBotsAPIReference()

  await i18next.init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: !isProduction,
    resources: {
      ru: require('../../locales/ru')
    }
  })

  bot.use(
    new MediaGroup(),
    session({
      /**
       * Session key generator
       *
       * @param {OpengramContext} ctx Context
       * @return {null|string}
       */
      getSessionKey: (ctx) => {
        if (ctx.from.id && ctx.chat?.id) {
          return `${ctx.from.id}:${ctx.chat.id}`
        }

        if (ctx.inlineQuery || ctx.callbackQuery?.inline_message_id) {
          return `${ctx.from.id}:${ctx.from.id}`
        }

        return null
      }
    }),
    i18nFactory(i18next),
    authorization,
    stage,
    handlers
  )

  bot.catch(err => logger.error('Bot error:', err))

  await bot.launch({
    polling: {
      allowedUpdates: ['callback_query', 'message', 'inline_query']
    },
    dropPendingUpdates: DROP_PENDING_ON_START
  })
  logger.info('Bot started successfully')

  return bot
}

module.exports = { startBot }
