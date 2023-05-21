const { Markup, Extra } = require('opengram')
const { markdownToTxt } = require('markdown-to-txt')
const Fuse = require('fuse.js')
const telegramifyMarkdown = require('telegramify-markdown')
const { T } = require('./resolveBotsAPIReferenceType')
const { botsAPI } = require('../enum')

/**
 * @param {Array} items
 * @param {number} offset
 * @param {number} limit
 * @return {{references: Set<string>, props: string}}
 */
function buildArgumentsAndProps (items, offset, limit) {
  const slicedItems = items.slice(offset, offset + limit)
  const referencesList = new Set()
  let result = ''

  for (const item of slicedItems) {
    const description = telegramifyMarkdown(item.description, 'remove')

    const tt = new T()
    const t = tt.getType(item)

    Array.from(tt.references).forEach(x => referencesList.add(x))

    result += `•   \`${item.name}\`: \`${t}\` \\- ${description}`
  }

  return { props: result, references: referencesList }
}

/**
 * @param {number} itemsCount
 * @param {string} id
 * @param {number} offset
 * @param {number} limit
 * @return {Array}
 */
function buildPagination (itemsCount, id, offset, limit) {
  const pagination = []
  if (itemsCount <= limit) return pagination

  if (offset) {
    pagination.push(Markup.callbackButton('«', `prev:${offset - limit}:${id}`))
  }

  if (offset + limit <= itemsCount) {
    pagination.push(Markup.callbackButton('»', `next:${offset + limit}:${id}`))
  }

  return pagination
}

/**
 *
 * @param {OpengramContext} ctx
 * @param {Array} searchResults
 * @param {0|1} type
 * @param {number} paginationOffset
 * @param {number} paginationLimit
 * @return {array}
 */
function prepareResults (ctx, searchResults, type, paginationOffset, paginationLimit) {
  const propNames = ['arguments', 'properties']
  const titleNames = ['Method', 'Type']
  const results = []

  for (const { item, score } of searchResults) {
    const { id, name, description } = item
    const propItems = item[propNames[type]] ?? []

    const { props, references } = buildArgumentsAndProps(
      propItems,
      paginationOffset,
      paginationLimit
    )

    if (item.type === 'any_of') item.any_of.forEach(v => v.reference && references.add(v.reference))

    const keyboard = Extra.markup(m => {
      return m.inlineKeyboard([
        ...buildPagination(propItems.length, id, paginationOffset, paginationLimit),
        ...[...references].map(x => m.switchToCurrentChatButton(x, x)),
        m.urlButton(ctx.i18n.t('reference.openButton'), item.documentation_link)
      ], {
        wrap: (btn, index, row) => {
          if (btn.text === '«' || btn.text === '»') return false
          if (btn.url === item.documentation_link || row[row.length - 1]?.text === '»') return true
          return index % 2 !== 0
        }
      })
    })

    const messageText = ctx.i18n.t('reference.' + (botsAPI.OBJECT === type ? 'typeContent' : 'methodContent'), {
      description: telegramifyMarkdown(
        item.description,
        'remove'
      )
        .trim(),
      properties: props ?? 'None',
      name
    })

    results.push({
      id,
      score,
      title: `${titleNames[type]} ${name}`,
      description: markdownToTxt(description),
      messageText,
      parseMode: 'MarkdownV2',
      keyboard
    })
  }

  return results
}

/**
 * @param {Array} items
 * @return {InlineQueryResultArticle[]}
 */
function toArticles (items) {
  return items.map(({ id, title, description, messageText, keyboard, parseMode }) => ({
    id,
    title,
    description,
    type: 'article',
    input_message_content: {
      message_text: messageText,
      parse_mode: parseMode,
      disable_web_page_preview: true
    },
    ...keyboard
  }))
}

/**
 * @param {OpengramContext} ctx
 * @param {string} query
 * @return {InlineQueryResultArticle[]}
 */
function search (ctx, query) {
  const apiData = ctx.botsAPIReference

  const options = { includeScore: true, keys: ['name'] }
  const fuse = new Fuse([...apiData.objects, ...apiData.methods], options)
  const result = fuse
    .search(query, { limit: 50 })

  const methodsResult = result.filter(({ item }) => item.__method === true)
  const objectsResult = result.filter(({ item }) => item.__object === true)

  const preparedMethods = prepareResults(ctx, methodsResult, 0, 0, 15)
  const preparedObjects = prepareResults(ctx, objectsResult, 1, 0, 15)

  const sortedResults = [...preparedMethods, ...preparedObjects]
    .sort((a, b) => a.score - b.score)

  return toArticles(sortedResults)
}

module.exports = { searchBotsAPI: search, prepareResults }
