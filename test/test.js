const logger = require("jsclass-logger")({ "debug": true }, "test");
const Document = require("../../entangler-db").Document;
const entangler_db = require("../../entangler-db").entangler_db;
const Serializable = require("../../jsclass-serializer");
const assert = require("assert");
const EventAware = require("../../jsclass-event");


describe('Document', function() {
  describe('Create Documents with Same UUID', function() {
    let a1 = undefined;
    class A extends Document {
      constructor(uuid) {
        super(uuid);
      }
    };

    it('#constructor()', function() {
      a1 = new A();
      a2 = new A(a1.uuid);

      a1.a = 1;

      assert.equal(a2.a, 1);
    })
  })
})