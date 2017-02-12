module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
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

  return Note;
};