const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DBDATABASE, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'mysql'
  });

const dbconnection = async () => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
dbconnection();

module.exports=sequelize;