const express = require("express");
const router = express.Router();

const DonHangController = require("../controllers/DonHangController");

// Tạo đơn hàng mới
router.post("/create", DonHangController.create);

// Xóa đơn hàng theo mã
router.delete("/delete/:id", DonHangController.delete);

// Lấy tất cả đơn hàng (có thể lọc theo query)
router.get("/", DonHangController.getAll);

// Lấy đơn hàng theo mã
router.get("/getId/:id", DonHangController.getById);

// Cập nhật trạng thái đơn hàng
router.put("/updateStatus/:id", DonHangController.updateTrangThai);

module.exports = router;
