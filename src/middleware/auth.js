// Import necessary modules and model
const bcrypt = require("bcrypt");
const User = require("../users/model");

// Define the number of salt rounds for password hashing
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Middleware function to hash the password before saving it
const hashPass = async (req, res, next) => {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Set the hashed password in the request body
    req.body.password = hashedPassword;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors and send a 501 status code with error details
    res.status(501).json({ message: error.message, error: error });
  }
};

// Middleware function to compare passwords during login
const comparePass = async (req, res, next) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user in the database based on the provided username
    const user = await User.findOne({ where: { username: username } });

    // If the user doesn't exist, return invalid credentials
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return invalid credentials
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set the authenticated user in the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors and send a 501 status code with error details
    res.status(501).json({ message: error.message, error: error });
  }
};

// Controller function to register a new user
const registerUser = async (req, res) => {
  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    // If user already exists, return a 400 status code with a message
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // If username and email don't exist, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Return a 201 status code with the newly created user
    res.status(201).json({ user: newUser });
  } catch (error) {
    // Handle errors and send a 500 status code with error details
    res.status(500).json({ message: error.message });
  }
};

// Export the functions for use in other files
module.exports = {
  registerUser: registerUser,
  hashPass: hashPass,
  comparePass: comparePass,
};
