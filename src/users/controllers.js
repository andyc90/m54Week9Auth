// Importing the User model
const User = require("./model");

// Function for user registration
const signupUser = async (req, res) => {
  try {
    // Extracting username, email, and password from request body
    const { username, email, password } = req.body;

    // Checking if the username already exists in the database
    const existingUsername = await User.findOne({
      where: { username: username },
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Checking if the email already exists in the database
    const existingEmail = await User.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Creating a new user in the database
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    // Sending a successful response with the new user information
    res.status(201).json({ message: "User added", user: user });
  } catch (error) {
    // Handling any errors that occur during user registration
    res.status(500).json({ message: error.message, error: error });
  }
};

// Function to retrieve all users from the database
const getAllUsers = async (req, res) => {
  try {
    // Retrieving all users from the database
    const users = await User.findAll();
    // Sending a successful response with the list of users
    res.status(200).json({ message: "All users", users: users });
  } catch (error) {
    // Handling any errors that occur while retrieving users
    res.status(500).json({ message: error.message, error: error });
  }
};

// Function for user login
const login = async (req, res) => {
  try {
    // Extracting authenticated user information from the request
    const authenticatedUser = req.user;

    // Sending a successful response with the logged-in user information
    res.status(200).json({
      message: `${authenticatedUser.username} logged in successfully`,
      user: authenticatedUser,
    });
  } catch (error) {
    // Handling any errors that occur during the login process
    res.status(501).json({ message: error.message, error: error });
  }
};

// Function for deleting a user
const deleteUser = async (req, res) => {
  try {
    // Extracting user ID from request parameters
    const userId = req.body.userId;

    // Finding the user in the database by ID
    const userToDelete = await User.findOne({
      where: { id: userId },
    });

    // Checking if the user exists
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Deleting the user
    await userToDelete.destroy();

    // Sending a successful response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handling any errors that occur during user deletion
    res.status(500).json({ message: error.message, error: error });
  }
};

// Function for deleting all users
const deleteAllUsers = async (req, res) => {
  try {
    // Deleting all users from the database
    await User.destroy({
      where: {}, // Empty condition to delete all users
      truncate: true, // Truncate option to reset auto-increment counter
    });

    // Sending a successful response
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    // Handling any errors that occur during user deletion
    res.status(500).json({ message: error.message, error: error });
  }
};

// Function for updating user
const updateUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { userId } = req.params;

    // Checks if the userId is provided in URL parameters
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required in the request parameters" });
    }

    // Finds the user with the given ID
    const user = await User.findOne({ where: { id: userId } });

    // Checks if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Updates the user dynamically based on the request body
    for (const key in req.body) {
      user[key] = req.body[key];
    }

    // Save the updated user
    await user.save();

    // Sending a successful response with the updated user
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // Handling any errors that occur during user update
    res.status(500).json({ message: error.message, error: error });
  }
};

// Exporting the functions to be used in other parts of the application
module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  login: login,
  deleteUser: deleteUser,
  deleteAllUsers: deleteAllUsers,
  updateUser: updateUser,
};
