import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../lib/db.js';

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, Infinity], // Minimum password length 8
        msg: 'Password must be at least 8 characters long',
      },
    },
  },
}, {
  timestamps: true,
  hooks: {
    // Hash password before creating a new user
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    },
    // Hash password before updating a user
    beforeUpdate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    },
  }
});

export default User;
