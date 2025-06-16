const GioHangService = require("../../services/GioHangService");

class GioHangController {
  async add(req, res) {
    try {
      const item = await GioHangService.add(req.body);
      res.status(201).json({
        success: true,
        message: item.message,
        data: item.data
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getByTaiKhoan(req, res) {
    try {
      const { mataikhoan } = req.params;
      const result = await GioHangService.getByTaiKhoan(mataikhoan);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await GioHangService.delete(id);
      res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateQuantity(req, res) {
    try {
      const { id } = req.params;
      const { soluong } = req.body;
      const result = await GioHangService.updateQuantity(id, soluong);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new GioHangController;
