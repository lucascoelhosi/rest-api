const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Adress = require('../app/models/Adress');
const Tech = require('../app/models/Tech');
const Project = require('../app/models/Project');
const Task = require('../app/models/Task');

const connection = new Sequelize(dbConfig);

User.init(connection);
Adress.init(connection);
Tech.init(connection);
Project.init(connection);
Task.init(connection);

User.associate(connection.models);
Adress.associate(connection.models);
Tech.associate(connection.models);
Project.associate(connection.models);
Task.associate(connection.models);

module.exports = connection;