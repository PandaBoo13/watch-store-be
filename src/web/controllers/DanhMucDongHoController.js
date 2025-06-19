const DanhMucDongHoService = require("../../services/DanhmucDonghoService");

class DanhMucDongHoController {
  // Thêm danh mục
  async create(req, res) {
    try {
      const danhmuc = await DanhMucDongHoService.create(req.body);
      res.status(201).json({
        success: true,
        message: danhmuc.message,
        data: danhmuc.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm danh mục thất bại",
      });
    }
  }

  // Lấy toàn bộ danh mục
  async getAll(req, res) {
    try {
      const list = await DanhMucDongHoService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách danh mục",
      });
    }
  }

  // Lấy danh mục theo mã
  async getById(req, res) {
    try {
      const { id } = req.params;
      const danhmuc = await DanhMucDongHoService.getById(id);
      res.status(200).json({
        success: true,
        message: danhmuc.message,
        data: danhmuc.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy danh mục",
      });
    }
  }

  // Cập nhật danh mục
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await DanhMucDongHoService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật danh mục thất bại",
      });
    }
  }

  // Xóa danh mục

  async delete(req, res) {
    try {
      const { id } = req.params;
      await DanhMucDongHoService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa danh mục thành công",
      });
    } catch (err) {
      // Nếu là lỗi từ MySQL về khóa ngoại
      if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
        return res.status(400).json({
          success: false,
          message: "Danh mục đang được sử dụng, không thể xóa.",
        });
      }

      res.status(400).json({
        success: false,
        message: err.message || "Xóa danh mục thất bại",
      });
    }
  }
}
module.exports = new DanhMucDongHoController();

