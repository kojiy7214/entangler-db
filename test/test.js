let assert = require('assert');

const SimpleNoSql = require('../../entangler-db').SimpleNoSql;
const Document = require('../../entangler-db').Document;
const DocumentTagAware = require('../../entangler-db').DocumentTagAware;

// TEST SET FOR DOCUMENT
let doc1;
let doc2;

describe('TESTING ### Document ###', function() {
  describe('create Document instance', function() {
    it('#construtor()', function() {
      let id = "test";
      let tags = ["test_tag1"];
      let data = {
        a: "A",
        b: "B"
      };
      doc1 = new Document(id, tags, data);
    })
  })

  describe('get data from Document', function() {
    it('#get()', function() {
      assert.equal(doc1.a, "A");
      assert.equal(doc1.b, "B");
      assert.equal(doc1.c, undefined);
    })
  })

  describe('sync data between Documents on creation', function() {
    it('#constructor() -> dispatchTo()', function() {
      let id = "test";
      let tags = ["test_tag1"];
      let data = {
        a: "1",
        b: "2",
        c: "C"
      };
      doc2 = new Document(id, tags, data);

      assert.equal(doc1.a, "1");
      assert.equal(doc1.b, "2");
      assert.equal(doc1.c, "C");

    })
  })

  describe('sync data between Documents on setProperty', function() {
    it('#property accessor -> dispatchTo()', function() {
      doc1.c = "E";
      assert.equal(doc2.c, "E");
    })
  })

  describe('sync data between Documents on setData', function() {
    it('#setData -> dispatchTo()', function() {
      let data = {
        a: "1",
        c: "2",
        e: "3",
        g: "4"
      };;
      doc1.setData(data);

      assert.equal(doc2.a, "1");
      assert.equal(doc2.b, "2");
      assert.equal(doc2.c, "2");
      assert.equal(doc2.d, undefined);
      assert.equal(doc2.e, "3");
      assert.equal(doc2.f, undefined);
      assert.equal(doc2.g, "4");

      assert.equal(doc1.a, "1");
      assert.equal(doc1.b, "2");
      assert.equal(doc1.c, "2");
      assert.equal(doc1.d, undefined);
      assert.equal(doc1.e, "3");
      assert.equal(doc1.f, undefined);
      assert.equal(doc1.g, "4");
    })
  })
})


// TEST SET FOR SimpleNoSql
let simple_no_sql = undefined;
describe('TESTING ### SimpleNoSql ###', function() {
  describe('create SimpleNoSql instance', function() {
    it('#construtor()', function() {
      simple_no_sql = new SimpleNoSql();
    })
  })

  let collectionname = "test";

  describe('insert data', function() {
    it('#construtor()', function() {
      let data = {
        "a": "A",
        "b": "B"
      };

      id = simple_no_sql.create(data, ["test_tag_1"]);
    })
  })

  describe('get data with id', function() {
    it('#get()', function() {
      let data = {
        "a": "A",
        "b": "B"
      };

      id = simple_no_sql.create(data, ["test_tag_1"]);
      data = simple_no_sql.get(id);
      assert.equal(data.a, "A");
      assert.equal(data.b, "B");

      simple_no_sql.create(data);

    })
  })

  describe('delete data with id', function() {
    it('#delete()', function() {
      let data = {
        "a": "A",
        "b": "B"
      };

      id = simple_no_sql.create(data);
      data = simple_no_sql.get(id);

      data.a = "A";

      assert.equal(data.a, "A");
      assert.equal(data.b, "B");
      simple_no_sql.delete(id);
      data = simple_no_sql.get(id);
      assert.equal(data, undefined);
    })
  })

  describe('find using [AND] operator', function() {
    it('#findAnd()', function() {
      let data = {
        "a": "P",
        "b": "Q"
      };
      id = simple_no_sql.create(data);

      let q1 = {
        "a": "P"
      };
      let ids = simple_no_sql.findAnd(q1).getDocumentArray();
      assert.equal(ids.length, 1);
      assert.equal(ids[0].getId(), id.getId());

      q1 = {
        "a": "P",
        "b": "Q"
      };
      ids = simple_no_sql.findAnd(q1).getDocumentArray();
      assert.equal(ids.length, 1);
      assert.equal(ids[0].getId(), id.getId());

      q1 = {
        "a": "A",
        "b": "B"
      };
      ids = simple_no_sql.findAnd(q1).getDocumentArray();
      assert.equal(ids.length, 2);

      q1 = {
        "a": "A",
        "b": "Q"
      };
      ids = simple_no_sql.findAnd(q1).getDocumentArray();
      assert.equal(ids.length, 0);
    })
  })

  describe('find using [OR] operator', function() {
    it('#findOr()', function() {
      let q1 = {
        "a": "A",
        "b": "Q"
      };

      let ids = simple_no_sql.findOr(q1, "test_tag_1").getDocumentArray();
      assert.equal(ids.length, 2);
    })
  })

  describe('add Tag', function() {
    it('#addTag()', function() {
      doc1.addTags("test22");
      assert.equal(doc1.getTags().includes("test22"), true);
      assert.equal(doc2.getTags().includes("test22"), true);
    })
  })
})