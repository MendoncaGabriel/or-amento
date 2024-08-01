// models/Vendedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vendedor = sequelize.define('Vendedores', {
  nome: DataTypes.STRING,
  senha: DataTypes.STRING
});

module.exports = Vendedor;
