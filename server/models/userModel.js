const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  //validation

  if (!email || !password) {
    console.log(email);
    throw Error("All fileds must be required!");
  }

  

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Passssword not strong");
  }

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
  const hash = await bcrypt.hash(password, salt); // Hash the password using the salt

  const user = await this.create({ email, password: hash }); // Store hashed password

  return user;
};

//static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fileds must be required!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const matches = await bcrypt.compare(password, user.password);  // Compare provided password with hashed one

  if (!matches) {
    throw Error("Incorrect password ");
  }

  return user; // Return the authenticated user if login is successful
};

module.exports = mongoose.model("User", userSchema);
