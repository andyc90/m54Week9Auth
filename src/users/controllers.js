const User = require("./model");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUsername = await User.findOne({
      where: { username: username },
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If username and email don't exist, proceed with user registration
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.status(201).json({ message: "User added", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "all users", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    const authenticatedUser = req.user;

    res.status(200).json({
      message: `${authenticatedUser.username} logged in successfully`,
      user: authenticatedUser,
    });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  login: login,
};
