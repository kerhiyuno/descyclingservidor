const { DataTypes } = require('sequelize');
const { sequelize } = require ('../controllers/connectMysql');


const Producto = sequelize.define('productos', {

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
        type: DataTypes.INTEGER,
        allowNull: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
      freezeTableName: true,
      timestamps: false
  });

module.exports = Producto;