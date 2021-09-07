const express = require('express');
const router = express.Router();

const adminService = require('../services/admin');

router.get('/', async (req, res) => {
  let stores = await adminService.findAll();
  res.render('admin/index', {stores: stores});
})

router.get('/stores', async(req, res) => {
  res.render('admin/createForm');
})

router.post('/stores', async(req, res) => {
  let store = req.body;
  let id = await adminService.saveStore(store);
  res.redirect('/admin');
})

router.get('/stores/:id', async (req, res) => {
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  res.render('admin/detail', {store: store});
})

module.exports = router;