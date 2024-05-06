const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = await bcryptjs.hashSync(password, 10);

  const newUser = await User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json("SignUp Successfuly");
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are requrired"));
  }
  console.log(email);
  const validUser = await User.findOne({ email });
  if (!validUser) {
    next(errorHandler(404, "User not found"));
  }

  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) {
    next(errorHandler(400, "Invalid password"));
  }
  try {
    const { password, ...rset } = validUser._doc;

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rset);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signIn };
