import AttributeType from '../datamodel/AttributeType'
import NumericType from './NumericType'

export let StringType = class extends AttributeType {
  constructor(val) {
    StringType.validate(val)
    this.val = val
  }

  equal(stringType) {
    return StringType.equal(this.val, stringType.val)
  }

  add(stringType) {
    this.val = StringType.add(this.val, stringType.val)
    return this
  }

  substract(stringType) {
    this.val = StringType.add(this.val, stringType.val)
    return this
  }

  multiply(numericType) {
    this.val = StringType.multiply(this.val, numericType.val)
    return stringType
  }

  devide(stringType) {
    this.val = StringType.devide(this.val, stringType.val)
    return this
  }

  mod(stringType) {
    this.val = StringType.mod(this.val, stringType.val)
    return this
  }

  static validate(val) {
    return typeof val == 'string'
  }

  static equal(v1, v2) {
    if (!StringType.validate(v1) || !StringType.validate(v2)) {
      throw new Error('Opeland(s) is not StringType.')
    }

    return v1 == v2
  }

  static add(v1, v2) {
    if (!StringType.validate(v1) || !StringType.validate(v2)) {
      throw new Error('Opeland(s) is not StringType.')
    }

    return v1 + v2
  }

  static substract(v1, v2) {
    if (!StringType.validate(v1) || !StringType.validate(v2)) {
      throw new Error('Opeland(s) is not StringType.')
    }

    return v1.replace(new Regexp('(.*)' + v2 + '(.*?)$', '$1$2'))
  }

  static multiply(v1, v2) {
    if (!StringType.validate(v1) || !NumericType.validate(v2)) {
      throw new Error('Opeland(s) is not a set of StringType and NumericType.')
    }

    return v1.repeat(v2)
  }

  static devide(v1, v2) {
    if (!StringType.validate(v1) || !StringType.StringType(v2)) {
      throw new Error('Opeland(s) is not StringType.')
    }

    return String((Sv1.match(v2) || []).length)
  }

  static mod(v1, v2) {
    if (!StringType.validate(v1) || !StringType.validate(v2)) {
      throw new Error('Opeland(s) is not NumericType.')
    }

    return v1.replceAll(v2, '')
  }

  static size(val) {
    if (!StringType.validate(val)) {
      throw new Error('Opeland(s) is not StringType.')
    }

    return val.length
  }
}

export { StringType }
