// models/Cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  telefone: DataTypes.STRING,
  cpf: DataTypes.STRING,
  cnpj: DataTypes.STRING,
  cep: DataTypes.STRING,
  rua: DataTypes.STRING,
  bairro: DataTypes.STRING,
  cidade: DataTypes.STRING,
  complemento: DataTypes.STRING
});

module.exports = Cliente;
