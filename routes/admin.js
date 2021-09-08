const express = require('express');
const router = express.Router();

const adminService = require('../services/admin');


// Store List
router.get('/', async (req, res) => {
  // Access Control Filter
  if (!req.user) {
    return res.redirect('/admin/login');
  }
  // check get param
  if (req.query.search) {
    let stores = await adminService.findByName(req.query.search);
    res.render('admin/index', {stores:stores});
  } else {
    let stores = await adminService.findAll();
    res.render('admin/index', {stores: stores});
  }

})

// Create Store
router.get('/stores', async(req, res) => {
  if (!req.user) res.redirect('/admin/login');
  res.render('admin/createForm');
})

router.post('/stores', async(req, res) => {
  if (!req.user) res.redirect('/admin/login');
  let store = req.body;
  let id = await adminService.saveStore(store);
  res.redirect('/admin');
})

// Show Store detail
router.get('/stores/:id', async (req, res) => {
  if (!req.user) res.redirect('/admin/login');
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  res.render('admin/detail', {store: store});
})

// Update Store
router.get('/stores/:id/form', async (req, res) => {
  if (!req.user) res.redirect('/admin/login');
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  res.render('admin/updateForm', {store: store});
})

router.put('/stores/:id', async (req, res) => {
  if (!req.user) res.redirect('/admin/login');
  let storeId = req.params.id;
  let data = req.body;
  let store = await adminService.updateStore(storeId, data);
  res.redirect('/admin');
})

// Delete Store
router.delete('/stores/:id', async (req, res) => {
  if (!req.user) res.redirect('/admin/login');
  let storeId = req.params.id;
  await adminService.removeStore(storeId);
  res.redirect('/admin');
})

// Access control
router.get('/login', async(req, res) => {
  res.render('admin/loginForm');
})

router.get('/logout', async(req, res) => {
  req.logout();
  res.redirect('/admin/login');
})

module.exports = router;