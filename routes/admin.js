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
  console.log(id);
  res.redirect('/admin');
})

module.exports = router;