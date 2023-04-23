class T {
  constructor () {
    this.types = {
      undefined: '*',
      properties: 'object',
      any_of: 'any_of',
      string: 'string',
      integer: 'number',
      reference: 'reference',
      bool: 'boolean',
      array: 'Array',
      float: 'number'
    }

    this.references = new Set()
  }

  enumerate (data) {
    const { enumeration, type } = data
    if (enumeration === undefined) return type

    return enumeration.map(x => `'${x}'`)
      .join('|')
  }

  resolveArrayType ({ array }) {
    return `${
      this.getType(array)
    }[]`
  }

  getType (data) {
    const {
      type,
      reference
    } = data

    const resType = this.types[type]

    if (resType === 'any_of') {
      return data.any_of.map(x => this.getType(x))
        .join('|')
    }

    if (type === 'array') return this.resolveArrayType(data)
    if (type === 'string') return this.enumerate(data)

    if (resType === 'reference') {
      this.references.add(reference)
    }

    return resType === 'reference' ? reference : resType
  }
}

module.exports = { T }
