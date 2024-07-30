const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
  nome: DataTypes.STRING,
  cnpj: DataTypes.STRING,
  ie: DataTypes.STRING,
  rua: DataTypes.STRING,
  tel: DataTypes.STRING,
  email: DataTypes.STRING,
  site: DataTypes.STRING,
  fixo: DataTypes.STRING,
});




module.exports = Empresa;
