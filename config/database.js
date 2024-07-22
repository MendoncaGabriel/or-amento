const { Sequelize } = require('sequelize');

const db = new Sequelize('orçamento', 'root', '22052719', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
