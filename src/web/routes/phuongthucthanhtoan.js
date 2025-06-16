const express = require("express");
const router = express.Router();

const PhuongThucController = require("../controllers/PhuongThucThanhToanController");

// Tạo phương thức thanh toán mới
router.post("/create", PhuongThucController.create);

// Xóa phương thức theo ID
router.delete("/delete/:id", PhuongThucController.delete);

// Lấy tất cả phương thức
router.get("/", PhuongThucController.getAll);

// Lấy phương thức theo ID
router.get("/getId/:id", PhuongThucController.getById);

// Cập nhật phương thức
router.put("/update/:id", PhuongThucController.update);

module.exports = router;
