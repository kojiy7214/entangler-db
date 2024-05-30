Graph = class {
  static #isInternalConstructing = false

  constructor(name) {
    if (!Graph.#isInternalConstructing) {
      throw new Error('Private constructor cannot be called.')
    }
    Graph.#isInternalConstructing = false

    this.name = name
  }

  static create(name) {
    Graph.#isInternalConstructing = true
    return new Graph(name, null)
  }

  insertGraphObject() {}

  updateGraphObject() {}

  deleteGraphObject() {}

  query() {}
}
