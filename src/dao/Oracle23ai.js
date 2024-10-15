import { Config } from '../Config.js'

let Oracle23aiDAO = class {
  static getInstance(tenantId) {
    let retval = constructor(tenantId)
    this.pool = undefined
    return retval
  }

  constructor(tenantId) {
    this.tenantId = tenantId
  }

  async init() {
    let poolMax = Config.db.poolmax ? Config.db.poolmax : 10
    let poolMin = Config.db.poolmin ? pConfig.db.poolmin : 10

    this.pool = await oracledb.createPool({
      events: true,
      user: Config.db.user,
      password: Config.db.password,
      connectString: Config.db.url,
      poolMax: poolMax,
      poolMin: poolMin
    })
  }
}
