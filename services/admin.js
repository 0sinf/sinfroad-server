const storeRepository = require('../models/Store');

exports.findAll = async function() {
  let stores = await storeRepository.findAll();
  return stores;
}

exports.saveStore = async function(store) {
  let storeId = await storeRepository.save(store);
  return storeId;
}