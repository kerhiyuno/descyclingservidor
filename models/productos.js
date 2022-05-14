const { DataTypes } = require('sequelize');
const connection = require ('../controllers/connectMysql');


const Producto = connection.define('productos', {

    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
    stock: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    precio: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoriaId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
  }, {
      freezeTableName: true,
      timestamps: false
  });

module.exports = Producto;