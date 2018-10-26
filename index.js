const Serializable = require("../jsclass-serializer");
const Map = require("../jsclass-map");
const EventAware = require("../jsclass-event");
const mix = require("../jsclass-mixin");
const logger = require("jsclass-logger")({}, "entangler-db");


let documents = Symbol();

class Entangler extends EventAware {
  static setStoragePath(storage_path) {
    Serializable.setStoragePath(storage_path);
  }

  constructor(path) {
    super();
    this[documents] = new Map();

    Serializable.setStoragePath(path);
    Serializable.loadAll(doc => this.addDoc(doc));
  }

  addDoc(doc) {
    this[documents].set(doc.uuid, doc);
    Serializable.saveToFile(doc);
  }

  getDoc(uuid) {
    return this[documents].get(uuid);
  }

  onDocChanged(doc) {
    Serializable.saveToFile(doc, doc.uuid);
    logger.debug("STATE CHAGE DETECTED");
    logger.debug(doc);
  }
}

class Document extends mix(Serializable, EventAware) {
  constructor(uuid) {
    super(uuid);
    EventAware.new(this);

    let handler = {
      set: function(doc, key, val) {
        Reflect.set(doc, key, val);
        doc.dispatchTo(o => o instanceof Entangler, "docChanged", doc);
      },
      apply: function(target, thisArg, argumentsList) {
        logger.debug(target);
        logger.debug(thisArg);
        logger.debug(argumentList);
        Reflect.apply(target, thisArg, argumentsList);
      }
    }

    let obj = undefined;

    if (!uuid) {
      entangler_db.addDoc(this);
      obj = this;
    } else {
      obj = entangler_db.getDoc(uuid);
      if (!obj) {
        throw "Document Not Found(uuid=" + uuid + ")";
      }
    }
    return new Proxy(new Proxy(obj, handler), {});
  }
}

var entangler_db = entangler_db || new Entangler("./data/");

module.exports.entangler_db = entangler_db;
module.exports.Document = Document;