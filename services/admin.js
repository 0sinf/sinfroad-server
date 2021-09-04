const storeRepository = require('../models/Store');

exports.findAll = async function() {
  let stores = await storeRepository.findAll();
  return stores;
}