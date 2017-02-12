module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    title: DataTypes.STRING,
    desc: DataTypes.STRING
  });

  return Note;
};