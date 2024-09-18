const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_todolist', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;