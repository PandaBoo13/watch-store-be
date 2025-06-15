const express = require("express");
const router = express.Router();

const DongHoController = require("../controllers/DongHoController");

// Tạo đồng hồ mới
router.post("/create", DongHoController.create);

// Xóa đồng hồ theo ID
router.delete("/delete/:id", DongHoController.delete);

// Lấy tất cả đồng hồ
router.get("/", DongHoController.getAll);

// Lấy đồng hồ theo ID
router.get("/getId/:id", DongHoController.getById);

// Cập nhật đồng hồ
router.put("/update/:id", DongHoController.update);

module.exports = router;
