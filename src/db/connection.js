// Import Sequelize module for database connectivity
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance using the provided MySQL URI from the environment variables
const sequelize = new Sequelize(process.env.MYSQL_URI);

// Authenticate the database connection
sequelize.authenticate();

// Log a message indicating that the database connection is working
console.log("db connection is working");

// Export the Sequelize instance for use in other files
module.exports = sequelize;
