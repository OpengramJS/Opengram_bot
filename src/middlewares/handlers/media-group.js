const { Composer } = require('opengram')

const mediaGroup = new Composer()
mediaGroup.on('media_group', async ctx => {
  const media = ctx.mediaGroup.map((m, i) => {
    const type = ('photo' in m && 'photo') ||
      ('audio' in m && 'audio') ||
      ('video' in m && 'video') ||
      ('document' in m && 'document')

    /** @type {Audio|PhotoSize[]|Document|Video} **/
    const media = m[type]

    let description = `  <b>Номер в группе:</b> <code>${i}</code>\n`
    description += `  <b>Тип:</b> <code>${type}</code>\n`
    description += `  <b>Спойлер:</b> <code>${!!m.has_media_spoiler}</code>\n`
    if (media.title !== undefined) description += `  <b>Заголовок:</b> <code>${media.title}</code>\n`
    if (media.performer !== undefined) description += `  <b>Исполнитель:</b> <code>${media.performer}</code>\n`
    if (m.caption !== undefined) description += `  <b>Подпись:</b> <code>${m.caption}</code>\n`
    if (media.duration !== undefined) description += `  <b>Длительность:</b> <code>${media.duration}</code>\n`
    if (media.width !== undefined) description += `  <b>Ширина / Высота:</b> <code>${media.width} / ${media.height}</code>`
    if (type === 'photo') {
      const sizes = media.map(x => `<code>${x.width}x${x.height}</code>`)
        .join(', ')
      description += `  <b>Ширина / Высота:</b> ${sizes}`
    }
    if (media.mime_type !== undefined) description += `  <b>Mime Type:</b> <code>${media.mime_type}</code>\n`
    if (media.file_size !== undefined) description += `  <b>Размер:</b> <code>${media.file_size}</code>\n`
    if (media.file_name !== undefined) description += `  <b>Имя файла:</b> <code>${media.file_name} Байт</code>\n`

    return description
  })

  await ctx.replyWithHTML(
    `<b>Медиа-группа (${ctx.mediaGroup.length}):</b>\n` + media.join('\n\n')
  )
})

module.exports = { mediaGroup }
