const express = require('express');
const router = express.Router();

let adminAddr = require('../config/admin').adminAddress;

const adminService = require('../services/store');

// Create Store
router.get('/stores', async(req, res) => {
  if (!req.user) res.redirect(`${adminAddr}/login`);
  res.render('admin/createForm');
})

router.post('/stores', async(req, res) => {
  if (!req.user) res.redirect(`${adminAddr}/login`);
  let store = req.body;
  let id = await adminService.saveStore(store);
  res.redirect(adminAddr);
})

// Show Store detail
router.get('/stores/:id', async (req, res) => {
  if (!req.user) res.redirect(`${adminAddr}/login`);
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  res.render('admin/detail', {store: store});
})

// Update Store
router.get('/stores/:id/form', async (req, res) => {
  if (!req.user) res.redirect(`${adminAddr}/login`);
  let storeId = req.params.id;
  let store = await adminService.findStore(storeId);
  console.log(store);
  res.render('admin/updateForm', {store: store});
})

router.put('/stores/:id', async (req, res) => {
  if (!req.user) res.redirect(`${adminAddr}/login`);
  let storeId = req.params.id;
  let data = req.body;
  let store = await adminService.updateStore(storeId, data);
  res.redirect(adminAddr);
})

// Delete Store
router.delete('/stores/:id', async (req, res) => {
  if (!req.user) res.redirect(`${adminAddr}/login`);
  let storeId = req.params.id;
  await adminService.removeStore(storeId);
  res.redirect(adminAddr);
})

// Access control
router.get('/login', async(req, res) => {
  res.render('admin/loginForm');
})

router.get('/logout', async(req, res) => {
  req.logout();
  res.redirect(`${adminAddr}/login`);
})

// Store List
router.get('/', async (req, res) => {
  // Access Control Filter
  if (!req.user) {
    return res.redirect(`${adminAddr}/login`);
  }
  let stores = await adminService.findAll();
  // check get param
  // if (req.query.search) {
  //   let category = req.query.category;
  //   switch (category) {
  //     case 'title':
  //       stores = stores.filter(store => store.title.includes(req.query.search));
  //       break;
  //     case 'addr':
  //       stores = stores.filter(store => store.addr.includes(req.query.search));
  //       break;
  //     case 'part':
  //       stores = stores.filter(store => store.part.includes(req.query.search));
  //       break;
  //   }
  // }
  res.render('admin/index', {stores: stores});
})

module.exports = router;