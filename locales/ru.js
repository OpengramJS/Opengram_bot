module.exports = {
  translation: {
    keyboard: {
      main: {},
      back: '◀️ Назад'
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
      message: '<b>Главное меню</b>'
    }
  }
}
