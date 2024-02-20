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

// Exporting the functions to be used in other parts of the application
module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  login: login,
};
