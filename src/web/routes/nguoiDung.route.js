const express = require("express");
const router = express.Router();

const NguoiDungController = require("../controllers/NguoiDungController");

// 📌 Đăng ký
router.post("/register", NguoiDungController.dangKy);

// 📌 Đăng nhập
router.post("/login", NguoiDungController.dangNhap);

// 📌 Lấy thông tin người dùng theo ID
router.get("/:id", NguoiDungController.layNguoiDung);

// 📌 Cập nhật thông tin người dùng
router.put("/:id", NguoiDungController.capNhatThongTin);

// 📌 Đổi mật khẩu
router.put("/change-password", NguoiDungController.doiMatKhau);

// 📌 Xóa người dùng
router.delete("/:id", NguoiDungController.xoaNguoiDung);

router.get("/", NguoiDungController.layTatCaNguoiDung);

module.exports = router;
