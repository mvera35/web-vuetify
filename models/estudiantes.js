'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiantes = sequelize.define('Estudiantes', {
    matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    aPaterno: DataTypes.STRING,
    aMaterno: DataTypes.STRING,
    nombre: DataTypes.STRING,
    semestreIngreso: DataTypes.INTEGER,
    creditosCursados: DataTypes.INTEGER
  }, {});
  Estudiantes.associate = function(models) {
    // associations can be defined here
  };
  return Estudiantes;
};
