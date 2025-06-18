const ChiTietDonHangService = require("../../services/ChiTietDonHangService");

class ChiTietDonHangController {
  // Tạo chi tiết đơn hàng
  async create(req, res) {
    try {
      const chitiet = await ChiTietDonHangService.create(req.body);
      res.status(201).json({
        success: true,
        message: chitiet.message,
        data: chitiet.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Tạo chi tiết đơn hàng thất bại",
      });
    }
  }

  // Lấy tất cả chi tiết đơn hàng
  async getAll(req, res) {
    try {
      const list = await ChiTietDonHangService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách chi tiết đơn hàng",
      });
    }
  }

  // Lấy chi tiết theo mã chi tiết
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await ChiTietDonHangService.getById(id);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy chi tiết đơn hàng",
      });
    }
  }

  // Lấy theo mã đơn hàng
  async getByDonHangId(req, res) {
    try {
      const { madonhang } = req.params;
      const result = await ChiTietDonHangService.getByDonHangId(madonhang);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy chi tiết cho đơn hàng",
      });
    }
  }

  // Cập nhật chi tiết đơn hàng
  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await ChiTietDonHangService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật chi tiết đơn hàng thất bại",
      });
    }
  }

  // Xóa chi tiết đơn hàng
  async delete(req, res) {
    try {
      const { id } = req.params;
      await ChiTietDonHangService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa chi tiết đơn hàng thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa chi tiết đơn hàng thất bại",
      });
    }
  }

  // Chuyển các sản phẩm đã chọn từ giỏ hàng sang chi tiết đơn hàng
  async chuyenTuGioHang(req, res) {
    try {
      const { mataikhoan, madonhang, selectedItems } = req.body;

      const result = await ChiTietDonHangService.chuyenTuGioHang(
        mataikhoan,
        madonhang,
        selectedItems
      );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Chuyển từ giỏ hàng sang chi tiết đơn hàng thất bại",
      });
    }
  }


}

module.exports = new ChiTietDonHangController;
