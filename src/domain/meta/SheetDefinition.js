/**
 */

export let SheetDefinition = class {
  /**
   * Returns specified SheetDefinition
   * @param {string} tenantId
   * @param {string} name
   * @param {Date} timestamp
   */
  static get(tenantId, name, timestamp) {
    let retval = new SheetDefinition(tenantId, name, timestamp)
  }

  /**
   * Returns specified SheetDefinition as array
   * @param {string} tenantId
   * @param {Date} timestamp
   */
  static getAll(tenantId, timestamp) {}

  /**
   * Returns newly created SheetDefinition
   * @param {string} tenantId
   * @param {string} name
   */
  static create(tenantId, name) {
    return new SheetDefinition(tenantId, name, new Date())
  }

  constructor(tenantId, name, timestamp) {
    this.tenantId = tenantId
    this.name = name
    this.timestamp = timestamp
  }

  save() {}
}
