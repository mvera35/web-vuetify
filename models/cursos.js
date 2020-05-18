'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cursos = sequelize.define('Cursos', {
    clave: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    creditos: DataTypes.INTEGER
  }, {});
  Cursos.associate = function(models) {
    // associations can be defined here
  };
  return Cursos;
};
