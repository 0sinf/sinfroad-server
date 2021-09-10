const express = require('express');
const router = express.Router();

const adminService = require('../../services/store');

router.get('/stores', async (req, res) => {
  let stores = await adminService.findAll();
  res.status(200).json(stores);
});

router.get('/stores/:id', async(req, res) => {
  let id = req.params.id;
  let store = await adminService.findStore(id);
  console.log(store);
  res.status(200).json(store);
})

module.exports = router;
