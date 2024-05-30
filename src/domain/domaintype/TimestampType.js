import AttributeType from '../datamodel/AttributeType'

export let TimestampType = class extends AttributeType {
  constructor(val) {
    TimestampType.validate(val)
    this.val = val
  }

  equal(timestampType) {
    return TimestampType.equal(this.val, timestampType.val)
  }

  add(timestampType) {
    this.val = TimestampType.add(this.val, timestampType.val)
    return this
  }

  substract(timestampType) {
    this.val = TimestampType.add(this.val, timestampType.val)
    return this
  }

  mod(timestampType) {
    this.val = TimestampType.mod(this.val, timestampType.val)
    return this
  }

  static validate(val) {
    return typeof val == 'string'
  }

  static equal(v1, v2) {
    if (!TimestampType.validate(v1) || !TimestampType.validate(v2)) {
      throw new Error('Opeland(s) is not TimestampType.')
    }

    return v1 == v2
  }

  static add(v1, v2) {
    if (!TimestampType.validate(v1) || !TimestampType.validate(v2)) {
      throw new Error('Opeland(s) is not TimestampType.')
    }

    return v1 + v2
  }

  static substract(v1, v2) {
    if (!TimestampType.validate(v1) || !TimestampType.validate(v2)) {
      throw new Error('Opeland(s) is not TimestampType.')
    }

    return v1.replace(new Regexp('(.*)' + v2 + '(.*?)$', '$1$2'))
  }

  static multiply(v1, v2) {
    if (!TimestampType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error(
        'Opeland(s) is not a set of TimestampType and NumericType.'
      )
    }

    return v1.repeat(v2)
  }

  static devide(v1, v2) {
    if (!TimestampType.validate(v1) || !TimestampType.TimestampType(v2)) {
      throw new Error('Opeland(s) is not TimestampType.')
    }

    return String((Sv1.match(v2) || []).length)
  }

  static mod(v1, v2) {
    if (!TimestampType.validate(v1) || !TimestampType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1.replceAll(v2, '')
  }

  static size(val) {
    if (!TimestampType.validate(val)) {
      throw new Error('Opeland(s) is not TimestampType.')
    }

    return val.length
  }
}

export { TimestampType }
