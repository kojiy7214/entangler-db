import crypto from 'crypto'

export let AttributeDef = class {
  static createAttribute(attributeDef, name, val) {
    return new Attribute(attributeDef, name, val)
  }

  constructor(attachTo, attrType, name, defVal, constrain, nullable, isArray) {
    this.id = crypto.randomUUID()
    this.name = name

    if (!attrType instanceof AttributeType) {
      throw new Error(attributeType + ' is not a valid attribute type object."')
    }

    this.attrType = attrType

    if (!attr.constructor.validate(val)) {
      throw new Error(
        defaultVal + ' is not a valid vallue for ' + attrType.constructor.name
      )
    }

    this.defVal = defVal

    if (!constrain && typeof constrain !== 'function') {
      throw new Error(constrain + ' is not a funtion')
    }

    this.constrain = constrain

    this.nullable = nullable ? nullable : true

    this.isArray = isArray ? isArray : false

    if (!attachTo && !attachTo instanceof StereoType) {
      throw new Error(attachTo + ' is not a StereoType object.')
    }

    attachTo?.addAttrDef(this)
  }
}
