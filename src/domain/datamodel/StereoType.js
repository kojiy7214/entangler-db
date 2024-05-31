StereoType = class {
  addAttrDef(attrDef) {
    if (attrDef.constructor.name !== 'AttributeDef') {
      throw new Error(attrDef + ' is not AttributeDef instance.')
    }

    if (this.attrDefs[attrDef.name]) {
      throw new Error(attrDef.name + ' is alerady defined for ' + this.name)
    }

    this.attrDefs[attrDef.name] = attrDef
  }

  static createStereoType() {}

  static deleteStereoType() {}

  static getStereiTyoe() {}

  static getStereoTypes() {}

  static getAttributesFor(stereotype) {}
}
