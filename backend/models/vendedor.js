const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vendedor = sequelize.define('Vendedor', {
  nome: DataTypes.STRING,
  senha: DataTypes.STRING
});

module.exports = Vendedor;
