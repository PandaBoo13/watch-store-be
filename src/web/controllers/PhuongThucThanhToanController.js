const PhuongThucService = require("../../services/PhuongThucThanhToanService");

class PhuongThucThanhToanController {
  // Thêm phương thức thanh toán
  async create(req, res) {
    try {
      const pt = await PhuongThucService.create(req.body);
      res.status(201).json({
        success: true,
        message: pt.message,
        data: pt.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm phương thức thanh toán thất bại",
      });
    }
  }

  // Lấy tất cả phương thức thanh toán
  async getAll(req, res) {
    try {
      const result = await PhuongThucService.getAll();
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách phương thức",
      });
    }
  }

  // Lấy theo mã phương thức
  async getById(req, res) {
    try {
      const { id } = req.params;
      const pt = await PhuongThucService.getById(id);
      res.status(200).json({
        success: true,
        message: pt.message,
        data: pt.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy phương thức thanh toán",
      });
    }
  }

  // Cập nhật phương thức
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await PhuongThucService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật phương thức thất bại",
      });
    }
  }

  // Xóa phương thức
  async delete(req, res) {
    try {
      const { id } = req.params;
      await PhuongThucService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa phương thức thanh toán thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa phương thức thất bại",
      });
    }
  }
}

module.exports = new PhuongThucThanhToanController;
