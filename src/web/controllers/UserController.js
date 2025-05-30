// web/controllers/UserController.js
const UserService = require("../../services/UserService");

const register = async (req, res, next) => {
  try {
    const { email, password, fullname, phone, address, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await UserService.register(req.body);
    res.status(202).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Registration failed"
    });
  }
};


module.exports = { register };
