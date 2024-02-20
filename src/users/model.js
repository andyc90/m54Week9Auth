// Import necessary modules for defining a Sequelize model
const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

// Define the User model with specific attributes and constraints
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the User model for use in other files
module.exports = User;
