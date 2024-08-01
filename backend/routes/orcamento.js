const express = require('express')
const router = express.Router()
const orcamentoController = require('../controller/orcamento')

router.post("/", orcamentoController.create);

router.get("/", orcamentoController.getAll);


module.exports = router

