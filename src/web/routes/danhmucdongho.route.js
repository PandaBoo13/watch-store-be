const express = require("express");
const router = express.Router();

const DanhMucDongHoController = require("../controllers/DanhMucDongHoController");

// Tạo danh mục mới
router.post("/create", DanhMucDongHoController.create);

// Xóa danh mục theo ID
router.delete("/delete/:id", DanhMucDongHoController.delete);

// Lấy tất cả danh mục
router.get("/", DanhMucDongHoController.getAll);

// Lấy danh mục theo ID
router.get("/getId/:id", DanhMucDongHoController.getById);

// Cập nhật danh mục
router.put("/update/:id", DanhMucDongHoController.update);

module.exports = router;
