const express = require('express');
const router = express.Router();

const storeService = require('../../services/store');

router.get('/stores', async (req, res) => {
  let stores = await storeService.findAll();
  res.status(200).json(stores);
});

router.get('/stores/:part', async(req, res) => {
  let part = req.params.part;
  let stores = await storeService.findByPart(part);
  res.status(200).json(stores);
})

// router.get('/stores/:id', async(req, res) => {
//   let id = req.params.id;
//   let store = await storeService.findStore(id);
//   console.log(store);
//   res.status(200).json(store);
// })

module.exports = router;
