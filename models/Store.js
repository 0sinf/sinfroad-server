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
    this.id = ++cnt;
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

exports.save = function(store) {
  let data = new Store(store.title, store.content, store.part, store.addr);
  stores.push(data);
  return data.id;
}