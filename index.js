const Serializable = require("jsclass-serializer");
const Map = require("jsclass-map");
const EventAware = require("jsclass-event");
const mix = require("jsclass-mixin");
const logger = require("jsclass-logger")();


let documents = Symbol();

class Entangler extends EventAware {
  static setStoragePath(storage_path) {
    Serializable.setStoragePath(storage_path);
  }

  constructor() {
    super();
    this[documents] = new Map();
  }

  addDocument(doc) {
    this[documents].set(doc.uuid, doc);
  }

  onStateChange(data) {

  }
}

class Document extends mix(Serializable, EventAware) {
  constructor() {
    super();
    EventAware.new(this);
    entangler_db.addDocument(this);

    let handler = {
      set: function(obj, prop, value) {
        if (obj[prop] !== value) {
          obj[prop] = value;
          let data = {};
          data.sender = obj;
          data.key = prop;
          data.val = value;
          obj.dispatchTo(o => o.uuid && o.uuid === obj.uuid, "stateChanged", data);
        }
        return true;
      }
    };

    return new Proxy(this, handler);
  }

  onStateChanged(data) {
    this[data.key] = data.val;
  }
}

var entangler_db = entangler_db || new Entangler();

module.exports.entangler_db = entangler_db;
module.exports.Document = Document;