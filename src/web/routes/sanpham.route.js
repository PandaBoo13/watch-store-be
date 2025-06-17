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

// Lọc sản phẩm
router.get("/filter", SanPhamController.getByFilter);

// Lấy chi tiết sản phẩm
router.get("/:id/detail", SanPhamController.getDetail);

// Lấy sản phẩm bestseller
router.get("/bestseller", SanPhamController.layDanhSachBestseller);

// Lấy đồng hồ nam
router.get("/donghonam", SanPhamController.layDongHoNam);

// Lấy đồng hồ nữ
router.get("/donghonu", SanPhamController.layDongHoNu);

// ✅ Lấy giá sản phẩm theo mã
router.get("/giaban/:id", SanPhamController.layGiaSanPham);

module.exports = router;
