const { Opengram, Composer } = require('opengram')
const { searchBotsAPI } = require('../../lib/search')

function minTwoDigits (n) {
  return (n < 10 ? '0' : '') + n
}

const inlineQuery = Composer.inlineQuery(/.*/, Opengram.log(), async (ctx) => {
  const [query] = ctx.match

  if (!query) {
    await ctx.answerInlineQuery(
      await main(ctx),
      { cache_time: 1 }
    )
    return
  }

  const result = await searchBotsAPI(ctx, query)

  return await ctx.answerInlineQuery(
    result,
    { cache_time: 1 }
  )
})

module.exports = { inlineQuery }

async function main (ctx) {
  const { version, recent_changes: recentChanges } = ctx.botsAPIReference

  return [{
    id: Math.random(),
    title: ctx.i18n.t('reference.opengramTitle', { id: ctx.from.id }),
    description: ctx.i18n.t('reference.opengramDescription'),
    type: 'article',
    thumbnail_url: 'https://raw.githubusercontent.com/OpengramJS/opengram/master/docs/media/Logo.png',
    input_message_content: {
      message_text: ctx.i18n.t('reference.opengramContent', { id: ctx.from.id }),
      parse_mode: 'HTML'
    }
  },
  {
    id: Math.random(),
    title: ctx.i18n.t('reference.botsApiTitle', {
      version: Object.values(version)
        .join('.'),
      date: Object.values(recentChanges)
        .map(minTwoDigits)
        .reverse()
        .join('.')
    }),
    description: ctx.i18n.t('reference.botsApiDescription'),
    type: 'article',
    thumbnail_url: 'https://telegram.org/img/t_logo.png',
    input_message_content: {
      message_text: ctx.i18n.t('reference.botsApiContent', { id: ctx.from.id }),
      parse_mode: 'HTML'
    }
  },
  {
    id: Math.random(),
    title: ctx.i18n.t('getId.inlineTitle', { id: ctx.from.id }),
    description: ctx.i18n.t('getId.inlineDescription'),
    type: 'article',
    input_message_content: {
      message_text: ctx.i18n.t('getId.inlineContent', { id: ctx.from.id })
    }
  }]
}
