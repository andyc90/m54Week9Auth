// Load environment variables from the .env file
require("dotenv").config();

// Import necessary modules for creating an Express app
const express = require("express");
const cors = require("cors");

// Import the User model
const User = require("./users/model");

// Import the user router
const userRouter = require("./users/routes");

// Import bcrypt's compareSync function
const { compareSync } = require("bcrypt");

// Define the port for the server, defaulting to 5001 if not provided
const port = process.env.PORT || 5001;

// Create an instance of the Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the user router for handling user-related routes
app.use(userRouter);

// Function to synchronize database tables (create them if they don't exist)
const syncTables = () => {
  User.sync();
};

// Start the server, synchronize tables, and log the port information
app.listen(port, () => {
  syncTables();
  console.log(`Server listening on port ${port}`);
});
