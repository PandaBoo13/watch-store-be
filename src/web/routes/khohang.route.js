const express = require("express");
const router = express.Router();

const KhoHangController = require("../controllers/KhoHangController");

// Tạo kho hàng mới
router.post("/create", KhoHangController.create);

// Xóa kho hàng theo ID
router.delete("/delete/:id", KhoHangController.delete);

// Lấy tất cả kho hàng
router.get("/", KhoHangController.getAll);

// Lấy kho hàng theo ID
router.get("/getId/:id", KhoHangController.getById);

// Cập nhật kho hàng
router.put("/update/:id", KhoHangController.update);

// Lấy các lần nhập kho theo mã đồng hồ
router.get("/dongho/:madongho", KhoHangController.getByDongHo);

module.exports = router;
