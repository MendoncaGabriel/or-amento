// Em routes/vendedor.js
const express = require('express');
const router = express.Router();
const vendedorController = require('../controller/vendedor');

router.get("/", vendedorController.getVendedores);


module.exports = router;
