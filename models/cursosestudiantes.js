'use strict';
module.exports = (sequelize, DataTypes) => {
  const CursosEstudiantes = sequelize.define('CursosEstudiantes', {
    clave_curso:{
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    matricula_estudiante:{
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {});
  CursosEstudiantes.associate = function(models) {
    // associations can be defined here
  };
  return CursosEstudiantes;
};
