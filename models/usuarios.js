const { DataTypes } = require('sequelize');
const { sequelize } = require ('../controllers/connectMysql');


const Usuario = sequelize.define('usuarios', {

    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
  }, {
      freezeTableName: true,
      timestamps: false
  });

module.exports = Usuario;