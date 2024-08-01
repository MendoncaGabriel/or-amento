const express = require('express')
const router = express.Router()

// Rotas
const authRouters = require('./routes/auth')
const clienteRouters = require('./routes/cliente')
const orcamentoRouters = require('./routes/orcamento')
const produtoRouters = require('./routes/produto')
const vendedorRouters = require('./routes/vendedor')


router.use('/auth', authRouters);
router.use('/cliente', clienteRouters);
router.use('/produto', produtoRouters);
router.use('/orcamento', orcamentoRouters);
router.use('/vendedor', vendedorRouters);

module.exports = router