const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Adress = require('../models/Adress');

const connection = new Sequelize(dbConfig);

User.init(connection);
Adress.init(connection);

User.associate(connection.models);
Adress.associate(connection.models);

module.exports = connection;