const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.APP_SECRET;
var RefreshTokens = [];

const User = require("../models/User");

register = async (req, res) => {
  try {
    req.body["picture"] = req.file.filename
    const password = bcrypt.hashSync(req.body.password, 8);
    const newUser = new User({
      ...req.body,
      password,
      
    });
    await newUser.save();

    res.status(200).json({
      message: "hurry! now account are successfuly created",
      data: newUser,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, massage: "Email not found !" });
    }
    
      const passwordCompare = bcrypt.compareSync(password, user.password);
      if (!passwordCompare) {
        return res.status(404).json({
          status: 404,
          massage: "password Incorrect !",
        });
      }
      const token = jwt.sign(
        {
          id: user._id,
          user: user,
        },
        SECRET,
        {
          expiresIn: "7 days",
        }
      );
      var refreshToken = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: 86400, //24hour
      });
      RefreshTokens[refreshToken] = user._id;

      const result = {
        email: user.email,
        user: user,
        token: token,
        expiresIn: 1,
        refreshtoken: refreshToken,
      };
      return res.status(200).json({
        ...result,
        message: "Hurray! You are now logged in.",
        success: true,
      });
    
  } catch (error) {
    res.status(404).json({ status: 404, massage: error.message });
  }
};





module.exports = {
  Login,
  register,
};
