const { DataTypes } = require('sequelize');
const { sequelize } = require ('../controllers/connectMysql');


const Categoria = sequelize.define('categorias', {

    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
      freezeTableName: true,
      timestamps: false
  });

module.exports = Categoria;