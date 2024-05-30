import AttributeType from '../datamodel/AttributeType'

export let BooleanType = class extends AttributeType {
  constructor(val) {
    BooleanType.validate(val)
    this.val = val
  }

  equal(booleanType) {
    return BooleanType.equal(this.val, booleanType.val)
  }

  not() {
    this.val = BooleanType.not(this.val)
    return this
  }

  and(booleanType) {
    this.val = BooleanType.and(this.val, booleanType.val)
    return this
  }

  or(booleanType) {
    this.val = BooleanType.or(this.val, booleanType.val)
    return this
  }

  xor(booleanType) {
    this.val = BooleanType.xor(this.val, booleanType.val)
    return this
  }

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
