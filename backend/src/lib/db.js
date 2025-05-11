import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a Sequelize instance and connect to the MySQL database using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,  // Database host
    dialect: 'mysql',           // Database dialect
  }
);

const connectMysql = async () => {
  try {
    // Authenticate connection to the database
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    
    // Sync the models to the database (create tables if they don't exist)
    await sequelize.sync();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;  // Propagate the error to be caught in server.js
  }
};

export { sequelize, connectMysql };
