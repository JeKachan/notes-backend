'use strict';

module.exports = function defineNote(sequelize, DataTypes) {
  return sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    }
  });
};
