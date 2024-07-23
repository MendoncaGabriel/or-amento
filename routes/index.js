var express = require('express');
var router = express.Router();
const indexController = require('../controller/index');
// PAGES
router.get('/', indexController.criarOrcamentoPage);
router.get('/orcamento/:id', indexController.orcamentoPage);

// API
router.post('/api/orcamento/create', indexController.createOrcamento)
router.post('/api/vendedor', indexController.checkVendedor)
router.get('/api/cliente/:name', indexController.getByName)
router.get('/api/produto/:ean', indexController.getProductByEanCode)

module.exports = router;

