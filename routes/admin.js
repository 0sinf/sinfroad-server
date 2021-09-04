const express = require('express');
const router = express.Router();

const adminService = require('../services/admin');

router.get('/', async (req, res) => {
  let stores = await adminService.findAll();
  res.render('admin/index', {stores: stores});
})

module.exports = router;