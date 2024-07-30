const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  telefone: DataTypes.STRING,
  cpf_cnpj: DataTypes.STRING,
  endereco: DataTypes.STRING,
  bairro: DataTypes.STRING,
  cidade: DataTypes.STRING,
  estado: DataTypes.STRING,
  cep: DataTypes.STRING
});

module.exports = Cliente;
