const express = require('express');
const router = express.Router();

const adminService = require('../services/admin');

// Store List
router.get('/', async (req, res) => {
  let stores = await adminService.findAll();
  res.render('admin/index', {stores: stores});
})

// Create Store
router.get('/stores', async(req, res) => {
  res.render('admin/createForm');
})

router.post('/stores', async(req, res) => {
  let store = req.body;
  let id = await adminService.saveStore(store);
  res.redirect('/admin');
})

// Show Store detail
router.get('/stores/:id', async (req, res) => {
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  res.render('admin/detail', {store: store});
})

// Update Store
router.get('/stores/:id/form', async (req, res) => {
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  res.render('admin/updateForm', {store: store});
})

router.put('/stores/:id', async (req, res) => {
  let storeId = req.params.id;
  let data = req.body;
  let store = await adminService.updateStore(storeId, data);
  res.redirect('/admin');
})

// Delete Store
router.delete('/stores/:id', async (req, res) => {
  let storeId = req.params.id;
  await adminService.removeStore(storeId);
  res.redirect('/admin');
})

module.exports = router;