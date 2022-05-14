const { DataTypes } = require('sequelize');
const connection = require ('../controllers/connectMysql');


const Categoria = connection.define('categorias', {

    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
      freezeTableName: true,
      timestamps: false
  });

module.exports = Categoria;