const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const test = (req, res) => {
  res.json({ message: "success" });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You are not allowed to update this user"));

  if (req.body.password) {
    if (req.body.password.length < 6)
      return next(errorHandler(400, "Password must be at least 6 characters"));

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profile: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async(req,res,next)=>{
  if(req.user.id !== req.params.id) return next(errorHandler(403,'You are not allowed delete this user account'));

  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }

}


module.exports = { test, updateUser,deleteUser };
