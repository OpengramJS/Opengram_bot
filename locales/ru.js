module.exports = {
  translation: {
    keyboard: {
      main: {},
      back: '◀️ Назад'
    },
    start: {
      message: '<b>Привет!</b>\n' +
        '\n' +
        'Я бот, который умеет искать по <b href="https://core.telegram.org/bots/api">Telegram Bots API</b> в инлайн режиме и имею\n' +
        'небольшие утилиты для просмотра объекта сообщений, ID групп / анонимных администраторов, пользователей,' +
        'каналов, информации о медиа-группах.\n' +
        '•   Ответь на сообщение <code>!src</code> и получи его объект в <b>JSON</b>.\n' +
        '•   Напиши мне / перешли мне сообщение, чтобы получить ID автора (чата / группы - для анонимных администраторов,' +
        'канала, пользователя)\n' +
        '•   Открой inline режим и напиши что-то для поиска',
      buttons: {
        gitRepo: '📁 GitHub репозиторий',
        opengram: '📦 Opengram',
        inline: '🔍 Открыть Inline режим'
      }
    },
    src: {
      originTooLong: 'Увы, оригинальное сообщение слишком длинное'
    },
    getId: {
      text: '<b>Тип идентификатора:</b> <code>{{ type }}</code>{{- anonymous }}\n' + // "-" disables escape for variable
        '<b>Идентификатор:</b> <code>{{ id }}</code>',
      anonymous: '(анонимный администратор <code>{{ name }}</code>)',
      inlineTitle: 'Ваш ID {{ id }}',
      inlineDescription: 'Нажмите, чтобы отправит его в текущий чат',
      inlineContent: 'Мой Telegram ID {{ id }}'
    },
    reference: {
      openButton: '🔗 Bots API Reference',
      botsApiTitle: 'Telegram Bot API Reference {{ version }} ({{ date }})',
      botsApiDescription: 'The Bot API is an HTTP-based interface created for developers keen on building bots for Telegram.',
      botsApiContent: '<a href="https://core.telegram.org/bots/api">Telegram Bot API Reference</a>',
      methodContent: '*Method:* `{{ name }}`:\n\n' +
        '{{- description }}\n' +
        '*Arguments:*\n' +
        '{{- arguments }}',
      typeContent: '*Type:* `{{ name }}`:\n\n' +
        '{{- description }}\n\n' +
        '*Properties:*\n' +
        '{{- properties }}',
      opengramTitle: 'Opengram API Reference',
      opengramDescription: 'Нажмите для отправки в текущий чат',
      opengramContent: '<a href="https://reference.opengram.dev">Opengram API Reference</a>'
    },
    unmatched: {
      message: 'Я такого не знаю :D'
    }
  }
}
