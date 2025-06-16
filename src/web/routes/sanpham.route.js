const express = require("express");
const router = express.Router();

const SanPhamController = require("../controllers/SanPhamController");

// Tạo sản phẩm mới
router.post("/create", SanPhamController.create);

// Xóa sản phẩm theo ID
router.delete("/delete/:id", SanPhamController.delete);

// Lấy tất cả sản phẩm
router.get("/", SanPhamController.getAll);

// Lấy sản phẩm theo ID
router.get("/getId/:id", SanPhamController.getById);

// Cập nhật sản phẩm
router.put("/update/:id", SanPhamController.update);

router.get("/filter", SanPhamController.getByFilter);

router.get("/:id/detail", SanPhamController.getDetail);

module.exports = router;
