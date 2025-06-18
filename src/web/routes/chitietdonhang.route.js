const express = require("express");
const router = express.Router();

const ChiTietDonHangController = require("../controllers/ChiTietDonHangController");

// Tạo chi tiết đơn hàng mới
router.post("/create", ChiTietDonHangController.create);

// Xóa chi tiết đơn hàng theo mã
router.delete("/delete/:id", ChiTietDonHangController.delete);

// Lấy tất cả chi tiết đơn hàng
router.get("/", ChiTietDonHangController.getAll);

// Lấy chi tiết đơn hàng theo mã chi tiết
router.get("/getId/:id", ChiTietDonHangController.getById);

// Lấy danh sách chi tiết đơn hàng theo mã đơn hàng
router.get("/donhang/:madonhang", ChiTietDonHangController.getByDonHangId);

// Cập nhật chi tiết đơn hàng
router.put("/update/:id", ChiTietDonHangController.update);

// ✅ Chuyển sản phẩm đã chọn từ giỏ hàng sang chi tiết đơn hàng
router.post("/chuyen-tu-giohang", ChiTietDonHangController.chuyenTuGioHang);

module.exports = router;
