const GraphObject = class {
  constructor(stereotype, name) {
    if (this.constructor == GraphObject) {
      throw new Error(
        `${this.constructor}  is abstract, and cannot be instantiated.`
      )
    }

    this.id = crypto.randomUUID()
    this.name = name
    this.createdAt = new Date() * 1
    this.deletedAt = null
  }
}

const Node = class extends GraphObject {
  constructor(stereotype) {
    this.edges = undefined
  }
}

const Edge = class extends GraphObject {
  constructor(stereotype) {
    this.node1 = undefined
    this.node2 = undefined
    this.direction = undefined
  }
}
