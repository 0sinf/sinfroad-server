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
  constructor(name, review, part, addr) {
    this.id = cnt++;
    this.name = name;
    this.review = review;
    this.part = part;
    this.addr = addr;
  }
}

// for test data
// for (let i = 0; i < 30; i++) {
//   let store = new Store(`title ${i}`, `content ${i}`, 'restaurant', 'aa');
//   stores.push(store);
// }
let store1 = new Store('세화숲', '프레첼이 맛있는 카페', 'cafe', '제주특별자치도 제주시 구좌읍 해맞이해안로 1460');
stores.push(store1);
let store2 = new Store('톰톰카레', '채식주의자들을 위한 카레', 'restaurant', '제주특별자치도 제주시 구좌읍 해맞이해안로 1112');
stores.push(store2);

exports.findAll = function() {
  // stores.push(new Store('title', 'content', 'addr'));
  return stores;
}

exports.save = function(data) {
  if (data.id) {
    let store = stores[data.id];
    store.name = data.name;
    store.review = data.review;
    store.part = data.part;
    store.addr = data.addr;
    return store.id;
  } else {
    let store = new Store(data.name, data.review, data.part, data.addr);
    stores.push(store);
    return store.id;
  }
}

exports.findOne = function(id) {
  let store = stores.find(s => s.id == id);
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

exports.findByName = function(search) {
  let data = stores.filter(store => store.name.includes(search));
  return data;
}

exports.findByPart = function(part) {
  let data = stores.filter(store => store.part === part);
  return data;
}