const Sequelize = require('sequelize');
const dataBaseConfig = require('../config/database');

const User = require('../models/User');
const Organization = require('../models/Organization');
const Campaign = require('../models/Campaign');

const connection = new Sequelize(dataBaseConfig);

User.init(connection);
Organization.init(connection);
Campaign.init(connection);

User.associate(connection.models);
Organization.associate(connection.models);
Campaign.associate(connection.models);

module.exports = connection;