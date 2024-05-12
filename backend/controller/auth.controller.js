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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Your not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Wrong password"));

    const token = jwt.sign({ id: validUser._id,isAdmin:validUser.isAdmin }, process.env.JWT_SECRET);
    const { password: hashPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).split(-8) +
        Math.random().toString(36).split(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        profile: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, google };
