// Don't select Repository yet. So use memory.
let stores = [];

// store count.
let cnt = 0;

class Store {
  /**
   * Store, need store's information.
   * 1. title : store's name.
   * 2. addr : stores's address. 
   * 3. content : 1 line assessment.
   * 4. SNS Link : kakao, naver, youtube links (optional)
   */
  constructor(title, content, part, addr) {
    this.id = cnt++;
    this.title = title;
    this.content = content;
    this.part = part;
    this.addr = addr;
  }
}

exports.findAll = function() {
  // stores.push(new Store('title', 'content', 'addr'));
  return stores;
}

exports.save = function(data) {
  if (data.id) {
    let store = stores[data.id];
    console.log(data);
    store.title = data.title;
    store.content = data.content;
    store.part = data.part;
    store.addr = data.addr;
    return store.id;
  } else {
    let store = new Store(data.title, data.content, data.part, data.addr);
    stores.push(store);
    return store.id;
  }
}

exports.findOne = function(id) {
  let store = stores[id];
  return store;
}

exports.remove = function(id) {
  let idx = 0;
  if (stores.length > 1) {
    for (let i = 0; i < stores.length; i++) {
      if (stores[i].id == id) {
        idx = i;
        break;
      }
    }
    stores.splice(idx, 1);
  } else {
    stores.shift();
  }
}