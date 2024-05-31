import AttributeType from '../datamodel/AttributeType'

export let NumericType = class extends AttributeType {
  static validate(val) {
    return typeof val == 'number'
  }

  static equal(v1, v2) {
    if (!NumericType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1 == v2
  }

  static add(v1, v2) {
    if (!NumericType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1 + v2
  }

  static substract(v1, v2) {
    if (!NumericType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1 - v2
  }

  static multiply(v1, v2) {
    if (!NumericType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1 * v2
  }

  static devide(v1, v2) {
    if (!NumericType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1 / v2
  }

  static mod(v1, v2) {
    if (!NumericType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1 % v2
  }

  static size(val) {
    if (!NumericType.validate(val)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    let [int_part, dec_part] = String(Math.abs(val)).split('.')

    int_length = !int_part || int_part == '0' ? 0 : int_part.length
    dec_length = !dec_part ? 0 : dec_part.length

    return Number(int_length + '.' + dec_length)
  }
}

export { NumericType }
