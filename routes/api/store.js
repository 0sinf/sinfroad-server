const express = require('express');
const router = express.Router();

const adminService = require('../../services/admin');

router.get('/stores', async (req, res) => {
  let stores = await adminService.findAll();
  res.status(200).json(stores);
});

module.exports = router;
