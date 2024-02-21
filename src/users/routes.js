// Import the Express Router module
const { Router } = require("express");

// Create a new router instance for user-related routes
const userRouter = Router();

// Import authentication middleware functions
const { hashPass, comparePass } = require("../middleware/auth");

// Import controller functions for handling user-related requests
const {
  signupUser,
  getAllUsers,
  login,
  deleteUser,
  deleteAllUsers,
  updateUser,
} = require("./controllers");

// Define routes for user signup, login, and getting all users
userRouter.post("/users/signup", hashPass, signupUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/getAllUsers", getAllUsers);
userRouter.delete("/users/deleteUser", deleteUser);
userRouter.delete("/users/deleteAllUsers", deleteAllUsers);
userRouter.put("/users/updateUser/:userId/", updateUser);

// Export the user router for use in other files
module.exports = userRouter;
