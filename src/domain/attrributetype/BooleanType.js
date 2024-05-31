import AttributeType from '../datamodel/AttributeType'

export let BooleanType = class extends AttributeType {
  static not(val) {
    if (!BooleanType.validate(val)) {
      throw new Error('Opeland(s) is not BooleanType.')
    }

    return !val
  }

  static and(v1, v2) {
    if (!BooleanType.validate(v1) || !BooleanType.validate(v2)) {
      throw new Error('Opeland(s) is not BooleanType.')
    }

    return v1 && v2
  }

  static or(v1, v2) {
    if (!BooleanType.validate(v1) || !BooleanType.validate(v2)) {
      throw new Error('Opeland(s) is not BooleanType.')
    }

    return v1 || v2
  }

  static xor(v1, v2) {
    if (!BooleanType.validate(v1) || !BooleanType.validate(v2)) {
      throw new Error('Opeland(s) is not BooleanType.')
    }

    return v1 != v2
  }

  static validate(val) {
    return typeof val == 'boolean'
  }

  static equal(v1, v2) {
    if (!BooleanType.validate(v1) || !BooleanType.validate(v2)) {
      throw new Error('Opeland(s) is not BooleanType.')
    }

    return v1 == v2
  }

  static size(val) {
    if (!BooleanType.validate(val)) {
      throw new Error('Opeland(s) is not BooleanType.')
    }

    return 1
  }
}

export { BooleanType }
