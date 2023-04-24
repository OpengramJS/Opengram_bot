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

    let description = ctx.i18n.t('mediaGroup.info.numberInGroup', { i })
    description += ctx.i18n.t('mediaGroup.info.numberInGroup', { type })
    description += ctx.i18n.t('mediaGroup.info.hasSpoiler', { hasSpoiler: !!m.has_media_spoiler })
    if (media.title !== undefined) description += ctx.i18n.t('mediaGroup.info.hasSpoiler', { title: media.title })
    if (media.performer !== undefined) description += ctx.i18n.t('mediaGroup.info.performer', { performer: media.performer })
    if (m.caption !== undefined) description += ctx.i18n.t('mediaGroup.info.caption', { caption: m.caption })
    if (media.duration !== undefined) description += ctx.i18n.t('mediaGroup.info.duration', { duration: media.duration })
    if (media.width !== undefined) description += ctx.i18n.t('mediaGroup.info.size', { width: media.width, height: media.height })
    if (type === 'photo') {
      const sizes = media.map(x => `<code>${x.width}x${x.height}</code>`)
        .join(', ')
      description += ctx.i18n.t('mediaGroup.info.sizes', { sizes })
    }
    if (media.mime_type !== undefined) description += ctx.i18n.t('mediaGroup.info.mimeType', { mimeType: media.mime_type })
    if (media.file_size !== undefined) description += ctx.i18n.t('mediaGroup.info.fileSize', { fileSize: media.file_size })
    if (media.file_name !== undefined) description += ctx.i18n.t('mediaGroup.info.fileName', { fileName: media.file_name })

    return description
  })

  await ctx.replyWithHTML(
    ctx.i18n.t('mediaGroup.info.mimeType', { len: ctx.mediaGroup.length }) + media.join('\n\n')
  )
})

module.exports = { mediaGroup }
