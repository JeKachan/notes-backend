'use strict';

const fs                        = require('fs');
const path                      = require('path');
const { Sequelize, DataTypes }  = require('sequelize');
const basename                  = path.basename(module.filename);
const env                       = process.env.NODE_ENV || 'development';
const config                    = require('../config/config.json')[env];
const db                        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (path.extname(file) === '.js');
  })
  .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
