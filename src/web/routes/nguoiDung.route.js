// web/routers/user.routes.js
const express = require("express");
const router = express.Router();

const NguoiDungController = require("../controllers/NguoiDungController");



// Route: POST /api/users/register
router.post("/register", NguoiDungController.dangKy);
router.post("/login",NguoiDungController.dangNhap);

module.exports = router;
