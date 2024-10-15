import { Config } from '../../Config.js'
let dao = await import('../../dao/' + Config.db.provider + '.js')

export let Namespace = class {
  //---- STATIC REPOSITORY METHOD ----

  //---- OBJECT DOMAIN METHOD ----
  constructor(tenantId) {
    this.tenantId = tenantId
  }
}
