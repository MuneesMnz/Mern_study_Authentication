const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware function to require authentication (protects routes)
const requireAuth = async (req, res, next) => {
  // Extract the 'authorization' field from the request headers
  const { authorization } = req.headers;

  // If no authorization header is present, respond with a 401 status (Unauthorized) and an error message
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // The authorization header is expected to contain a Bearer token in the format "Bearer <token>"
  // Split the string and take the token part
  const token = authorization.split(" ")[1];

  try {
    // Verify the token using the JWT secret stored in the environment variable (JWT_SECRET)
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user's ID (_id) to the request object after finding the user in the database
    // We use 'select("_id")' to return only the _id field from the user
    req.user = await User.findById({ _id }).select("_id");

    // Call 'next()' to pass control to the next middleware function or route handler
    next();
  } catch (error) {
    // If there's an error in verifying the token (e.g., invalid token), log the error and respond with a 401 status
    console.log(error);
    res.status(401).json({ error: "Request is not Authorized" });
  }
};

module.exports = requireAuth;
