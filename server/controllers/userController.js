const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Helper function to create a JWT token
const createToken = (_id) => {
  // Sign a new JWT using the user's _id and a secret key stored in the environment variable
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  // The token will expire in 1 day ("1d")
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call the custom login method from the User model to verify credentials
    const user = await User.login(email, password);

    // If login is successful, create a JWT token with the user's _id
    const token = createToken(user._id);
    // Respond with status 200 and the user's email along with the JWT token
    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call the custom signup method from the User model to create a new user
    const user = await User.signup(email, password);

    // After successful signup, create a JWT token with the user's _id
    const token = createToken(user._id);
    // Respond with status 200 and the user's email along with the JWT token
    res.status(200).json({ email, token });
  } catch (error) {
    // If there's an error (e.g., email already exists), respond with a 400 status and the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
