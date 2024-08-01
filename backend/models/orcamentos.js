
// models/Orcamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./cliente');
const Vendedor = require('./vendedor');

const ProdutoOrcamento = sequelize.define('Produto_Orcamento', {
  descricao: DataTypes.STRING,
  price: DataTypes.FLOAT, // Corrigido para FLOAT
  quantidade: DataTypes.INTEGER, // Corrigido para INTEGER
  total: DataTypes.FLOAT, // Corrigido para FLOAT
});

// Definição do modelo Orcamento
const Orcamento = sequelize.define('Orcamento', {
  subtotal: DataTypes.FLOAT,
  metodo_pagamento: DataTypes.STRING,
  observacoes: DataTypes.STRING,
});

// Relacionamentos
Orcamento.belongsTo(Cliente, { foreignKey: 'clienteId' });
Orcamento.belongsTo(Vendedor, { foreignKey: 'vendedorId' });
Orcamento.hasMany(ProdutoOrcamento, { foreignKey: 'orcamentoId' });

module.exports = {Orcamento, ProdutoOrcamento};

