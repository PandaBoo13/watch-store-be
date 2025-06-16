const SanPhamService = require("../../services/SanPhamService");

class SanPhamController {
  // Thêm sản phẩm
  async create(req, res) {
    try {
      const sanpham = await SanPhamService.create(req.body);
      res.status(201).json({
        success: true,
        message: sanpham.message,
        data: sanpham.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm sản phẩm thất bại",
      });
    }
  }

  // Lấy tất cả sản phẩm
  async getAll(req, res) {
    try {
      const list = await SanPhamService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách sản phẩm",
      });
    }
  }
  async getByFilter(req, res) {
    try {
      const filters = req.query; // Lấy điều kiện từ URL query
      const list = await SanPhamService.getByFilter(filters);
      res.status(200).json({
        success: true,
        message: "Lọc sản phẩm thành công",
        data: list.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Lọc sản phẩm thất bại",
      });
    }
  }

  // Lấy sản phẩm theo mã
  async getById(req, res) {
    try {
      const { id } = req.params;
      const sanpham = await SanPhamService.getById(id);
      res.status(200).json({
        success: true,
        message: sanpham.message,
        data: sanpham.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy sản phẩm",
      });
    }
  }

  // Cập nhật sản phẩm
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await SanPhamService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật sản phẩm thất bại",
      });
    }
  }

  // Xóa sản phẩm
  async delete(req, res) {
    try {
      const { id } = req.params;
      await SanPhamService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa sản phẩm thất bại",
      });
    }
  }
}

module.exports = new SanPhamController();
