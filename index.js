const path = require('path');
const fs = require('fs');
const Utils = require('simpleutils');
const Map = Utils.Map;
const EventAware = Utils.EventAware;
const generateUuid = Utils.generateUuid;
const mix = Utils.mix;
const getClassFromName = Utils.getClassFromName;


/*

*/

/**
 * This is just a marker class, which should be used when a class needs
 * catch an event when document data is changed.
 */
class DocumentDataAware {};

/**
 * This is just a marker class, which should be used when a class needs
 * catch an event when document tags are changed.
 */
class DocumentTagAware {};

/**
 * Every query to SimpleNoSql is returned as document.
 * Document is a wrapper to application data, which adds
 * "id" and "collection" properties outside of it.
 */
class Document extends EventAware {
  /**
   * Workaround to bind "this" to filter function.
   */
  static _dataAwareFilterFactory(srcid) {
    return function(e) {
      return (e instanceof DocumentDataAware || (e.isMixedWith && e.isMixedWith(DocumentDataAware))) || (e instanceof Document && srcid === e._id)
    }
  }

  static _tagAwareFilterFactory(srcid) {
    return function(e) {
      return (e instanceof DocumentTagAware || (e.isMixedWith && e.isMixedWith(DocumentTagAware))) || (e instanceof Document && srcid === e._id)
    }
  }

  static _bindDataToProperty(target, data) {
    Object.keys(data).forEach(function(prop) {
      !target[prop] && Object.defineProperty(target, prop, {
        get: function() {
          return data[prop];
        },
        set: function(val) {
          data[prop] = val;
          this.dispatchTo(Document._dataAwareFilterFactory(this._id), "propertyChanged", this, prop, val);
        }
      });
    });
  }


  constructor(id, tags, data) {
    super();

    this._id = id;
    if (Array.isArray(tags)) {
      this._tags = new Set(tags);
    } else if (tags) {
      throw "tags should be an Array";
    } else {
      this._tags = new Set();
    }
    this._data = data;

    Document._bindDataToProperty(this, this._data);
    this.dispatchTo(Document._dataAwareFilterFactory(this._id), "dataChanged", this);
  }

  getId() {
    return this._id;
  }

  getTags() {
    return Array.from(this._tags);
  }

  addTags(tags) {
    if (Array.isArray(tags)) {
      tags.forEach(o => this._tags.add(o));
    } else {
      this._tags.add(tags);
    }
    this.dispatchTo(Document._tagAwareFilterFactory(this._id), "tagsAdded", this.getId(), tags);
  }

  removeTags(tags) {
    if (Array.isArray(tags)) {
      tags.forEach(o => this._tags.delete(o));
    } else {
      this._tags.delete(tag);
    }
    this.dispatchTo(Document._tagAwareFilterFactory(this._id), "tagsRemoved", this.getId(), tags);
  }

  setData(data) {
    Object.assign(this._data, data);
    Document._bindDataToProperty(this, this._data);
    this.dispatchTo(Document._dataAwareFilterFactory(this._id), "dataChanged", this);
  }

  getData() {
    return this._data;
  }

  onPropertyChanged(doc, key, val) {
    this._data[key] = val;
    Document._bindDataToProperty(this, this._data);
  }

  onDataChanged(doc) {
    Object.assign(this._data, doc._data);
    Document._bindDataToProperty(this, this._data);
  }

  onTagsAdded(id, tags) {
    if (Array.isArray(tags)) {
      tags.forEach(o => this._tags.add(o));
      this.dispatchTo()
    } else {
      this._tags.add(tags);
    }
  }

  onTagsRemoved(id, tags) {
    this.removeTags(tags);
    if (Array.isArray(tags)) {
      tags.forEach(o => this._tags.delete(o));
    } else {
      this._tags.delete(tag);
    }
  }
}

/**
 * In-Memory NoSql DB alike.
 * !!BE AWARE!! This DB alike class is NOT FOR PRODUCTION.
 * You are advised NOT TO USE SIMPLENOSQL in you productoin.
 */
class SimpleNoSql extends mix(EventAware, DocumentDataAware, DocumentTagAware) {
  static instance(dbpath) {
    return global.simple_no_sql || new SimpleNoSql(dbpath);
  }

  constructor(dbpath) {
    super();

    this._dbpath = dbpath;

    // primary index map
    this._idx = new Map();
    //virtual index map, used mainly for tag support
    this._vidx = new Map();

    if (!global.simple_no_sql) {
      global.simple_no_sql;
    }
  }

  _getTagMap(tag) {
    let retval = this._vidx.get(tag);

    if (!retval) {
      retval = new Map();
      this._vidx.set(tag, retval);
    }
    return retval;
  }

  _addToVirtualIndexMap(id, doc) {
    let tags = doc.getTags();
    for (let o in tags) {
      let tagmap = this._getTagMap(tags[o]);
      tagmap.set(id, doc);
    };
  }

  onTagAdded(id, tags) {
    if (Array.isArray(tags)) {
      tags.forEach(
        function(o) {
          let tagmap = this._getTagMap(o);
          tagMap.set(id, this._idx.get(id));
        }
      );
    } else {
      let tagmap = this._getTagMap(tag);
      tagMap.set(id, this._idx.get(id));
    }
  }

  onTagRemoved(id, tags) {
    if (Array.isArray(tags)) {
      tags.forEach(
        function(o) {
          let tagmap = this._getTagMap(o);
          tagMap.delete(id);
        }
      );
    } else {
      let tagmap = this._getTagMap(tag);
      tagMap.delete(id);
    }
  }

  onDataChanged(doc) {
    console.log("SIMPLENOSQL HAS CATCHED THE DATA CHANGE EVENT.");
  }

  onPropertyChanged(doc, prop, va) {
    console.log("SIMPLENOSQL HAS CATCHED THE PROPERTY CHANGE EVENT.");
  }

  create(data, tags) {
    //get unique id
    let id = undefined;
    while (!id) {
      id = generateUuid();
      if (this._idx.get(id)) {
        id = undefined;
      }
    }

    let doc = new Document(id, tags, data);

    //set to idx map for fast get
    this._idx.set(id, doc);
    //add to virtual idx map for faset find
    this._addToVirtualIndexMap(id, doc);
    return doc;
  }

  get(id) {
    if (id instanceof Document) {
      id = id.getId();
    }
    return this._idx.get(id);
  }

  delete(id) {
    if (id instanceof Document) {
      id = id.getId();
    }
    this._idx.delete(id);
  }

  findAnd(data, tags) {
    let retval = new SimpleNoSql();
    let idxmap = this._idx;

    if (tags) {
      idxmap = this._getTagMap(tags);
      if (!idxmap) {
        return retval;
      }
    }

    idxmap.keys().forEach(function(o) {
      let target = idxmap.get(o);
      let match = true;
      for (let e in target) {
        for (let e in data) {
          if (!target[e] || target[e] !== data[e]) {
            match = false;
            break;
          }
        }
        if (!match) {
          break;
        }
      }
      if (match) {
        retval._idx.set(o, target);
        retval._addToVirtualIndexMap(o, target);
      }
    })
    return retval;
  }

  findOr(data, tags) {
    let retval = new SimpleNoSql();
    let idxmap = this._idx;

    if (tags) {
      idxmap = this._getTagMap(tags);
      if (!idxmap) {
        return retval;
      }
    }

    idxmap.keys().forEach(function(o) {
      let target = idxmap.get(o);
      let match = false;
      for (let e in target) {
        for (let e in data) {
          if (target[e] && target[e] === data[e]) {
            match = true;
            break;
          }
        }
        if (!match) {
          break;
        }
      }
      if (match) {
        retval._idx.set(o, target);
        retval._addToVirtualIndexMap(o, target);
      }
    })

    return retval;
  }

  getDocumentArray() {
    let retval = [];
    let idxmap = this._idx;

    idxmap.keys().forEach(function(o) {
      retval.push(idxmap.get(o));
    });

    return retval;
  }
}

module.exports.SimpleNoSql = SimpleNoSql;
module.exports.Document = Document;
module.exports.DocumentTagAware = DocumentTagAware;