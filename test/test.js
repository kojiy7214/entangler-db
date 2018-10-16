const Document = require("../../entangler-db").Document;
const entangler_db = require("../../entangler-db").entangler_db;
const Serializable = require("jsclass-serializer");
const assert = require("assert");
const EventAware = require("jsclass-event");

Serializable.setStoragePath("./data/");

describe('Document', function() {
  describe('Create New Subclass', function() {
    let a1 = undefined;
    class A extends Document {
      constructor() {
        super();
      }
    };

    it('#constructor()', function() {
      a1 = new A();
    })

    it('#saveToFile', function() {
      a1.saveToFile();
    })

    it('#loadFromFile', function() {
      let a2 = Serializable.loadFromFile(a1.uuid);

      assert.equal(a2 instanceof A, true);
      assert.equal(a2 instanceof Serializable, true);
      assert.equal(a2 instanceof EventAware, true);

      assert.equal(a2.a, undefined);
      a1.a = "a";
      assert.equal(a2.a, "a");

      a2.a = "b";
      assert.equal(a1.a, "b");
    })
  })
})