const express = require('express')
const router = express.Router()
const clienteController = require('../controller/cliente')

router.get("/", clienteController.getAll)




module.exports = router