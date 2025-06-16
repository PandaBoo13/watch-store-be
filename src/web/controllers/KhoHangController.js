const KhoHangService = require("../../services/KhoHangService");

class KhoHangController {
  // Thêm dòng nhập kho mới
  async create(req, res) {
    try {
      const kho = await KhoHangService.create(req.body);
      res.status(201).json({
        success: true,
        message: kho.message,
        data: kho.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm kho hàng thất bại",
      });
    }
  }

  // Lấy toàn bộ kho hàng
  async getAll(req, res) {
    try {
      const list = await KhoHangService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách kho hàng",
      });
    }
  }

  // Lấy chi tiết 1 dòng kho theo ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const kho = await KhoHangService.getById(id);
      res.status(200).json({
        success: true,
        message: kho.message,
        data: kho.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy kho hàng",
      });
    }
  }

  // Cập nhật thông tin kho
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await KhoHangService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật kho hàng thất bại",
      });
    }
  }

  // Xóa dòng kho
  async delete(req, res) {
    try {
      const { id } = req.params;
      await KhoHangService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa kho hàng thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa kho hàng thất bại",
      });
    }
  }

  // Lấy danh sách nhập kho theo mã đồng hồ
  async getByDongHo(req, res) {
    try {
      const { madongho } = req.params;
      const list = await KhoHangService.getByDongHo(madongho);
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Không thể lấy danh sách kho theo đồng hồ",
      });
    }
  }
}

module.exports = new KhoHangController;
