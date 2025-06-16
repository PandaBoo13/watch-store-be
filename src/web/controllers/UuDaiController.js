const UuDaiService = require("../../services/UuDaiService");

class UuDaiController {
  // Thêm ưu đãi
  async create(req, res) {
    try {
      const uudai = await UuDaiService.create(req.body);
      res.status(201).json({
        success: true,
        message: uudai.message,
        data: uudai.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm ưu đãi thất bại",
      });
    }
  }

  // Lấy tất cả ưu đãi
  async getAll(req, res) {
    try {
      const list = await UuDaiService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách ưu đãi",
      });
    }
  }

  // Lấy ưu đãi theo mã
  async getById(req, res) {
    try {
      const { id } = req.params;
      const uudai = await UuDaiService.getById(id);
      res.status(200).json({
        success: true,
        message: uudai.message,
        data: uudai.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy ưu đãi",
      });
    }
  }

  // Cập nhật ưu đãi
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await UuDaiService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật ưu đãi thất bại",
      });
    }
  }

  // Xóa ưu đãi
  async delete(req, res) {
    try {
      const { id } = req.params;
      await UuDaiService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa ưu đãi thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa ưu đãi thất bại",
      });
    }
  }
}

module.exports = new UuDaiController;
