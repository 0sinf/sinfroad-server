const storeRepository = require('../models/Store');

exports.findAll = async function() {
  let stores = await storeRepository.findAll();
  return stores;
}

exports.saveStore = async function(data) {
  let storeId = await storeRepository.save(data);
  return storeId;
}

exports.findStore = async function(id) {
  let store = await storeRepository.findOne(id);
  return store;
}

exports.updateStore = async function(id, data) {
  data.id = id;
  let storeId = await storeRepository.save(data);
  return storeId;
}

exports.removeStore = async function(id) {
  storeRepository.remove(id);
}

exports.findByTitle = async function(search) {
  let stores = await storeRepository.findByTitle(search);
  return stores;
}