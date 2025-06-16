const DonHangService = require("../../services/DonHangService");

class DonHangController {
  // Tạo đơn hàng
  async create(req, res) {
    try {
      const donhang = await DonHangService.create(req.body);
      res.status(201).json({
        success: true,
        message: donhang.message,
        data: donhang.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Tạo đơn hàng thất bại",
      });
    }
  }

  // Lấy tất cả đơn hàng (có thể có filter theo tài khoản, trạng thái, ...)
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await DonHangService.getAll(filters);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách đơn hàng",
      });
    }
  }

  // Lấy chi tiết đơn hàng theo mã
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await DonHangService.getById(id);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy đơn hàng",
      });
    }
  }

  // Cập nhật trạng thái đơn hàng
  async updateTrangThai(req, res) {
    try {
      const { id } = req.params;
      const { trangthai } = req.body;
      const result = await DonHangService.updateTrangThai(id, trangthai);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật trạng thái thất bại",
      });
    }
  }

  // Xóa đơn hàng
  async delete(req, res) {
    try {
      const { id } = req.params;
      await DonHangService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa đơn hàng thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa đơn hàng thất bại",
      });
    }
  }
}

module.exports = new DonHangController;
