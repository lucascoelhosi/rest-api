const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Adress = require('../models/Adress');
const Tech = require('../models/Tech');

const connection = new Sequelize(dbConfig);

User.init(connection);
Adress.init(connection);
Tech.init(connection);

User.associate(connection.models);
Adress.associate(connection.models);
Tech.associate(connection.models);

module.exports = connection;