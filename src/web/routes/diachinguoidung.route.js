const express = require("express");
const router = express.Router();

const DiaChiNguoiDungController = require("../controllers/DiaChiNguoiDungController");

// Thêm địa chỉ mới
router.post("/create", DiaChiNguoiDungController.create);

// Xóa địa chỉ theo mã
router.delete("/delete/:id", DiaChiNguoiDungController.delete);

// Lấy tất cả địa chỉ theo tài khoản
router.get("/taikhoan/:mataikhoan", DiaChiNguoiDungController.getByTaiKhoan);

// Lấy địa chỉ theo mã địa chỉ
router.get("/getId/:id", DiaChiNguoiDungController.getById);

// Cập nhật địa chỉ
router.put("/update/:id", DiaChiNguoiDungController.update);

module.exports = router;
