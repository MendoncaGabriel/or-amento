const express = require('express')
const router = express.Router()
const produtoController = require('../controller/produto')

router.get("/:ean", produtoController.getProductByEanCode)

module.exports = router