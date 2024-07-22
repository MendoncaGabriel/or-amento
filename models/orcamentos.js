// models/Orcamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Orcamento = sequelize.define('Orcamento', {
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  items:  DataTypes.TEXT,
  formaPagamento: DataTypes.STRING,
  observacoes: DataTypes.STRING,
  cliente: DataTypes.STRING,
});



module.exports = Orcamento;
