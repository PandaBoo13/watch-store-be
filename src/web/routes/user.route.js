// web/routers/user.routes.js
const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// Route: POST /api/users/register
router.post("/register", UserController.register);

module.exports = router;
