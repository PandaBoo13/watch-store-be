const DiaChiNguoiDungService = require("../../services/DiaChiNguoiDungService");

class DiaChiNguoiDungController {
  // Tạo địa chỉ mới
  async create(req, res) {
    try {
      const diachi = await DiaChiNguoiDungService.create(req.body);
      res.status(201).json({
        success: true,
        message: diachi.message,
        data: diachi.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm địa chỉ thất bại",
      });
    }
  }

  // Lấy tất cả địa chỉ của tài khoản
  async getByTaiKhoan(req, res) {
    try {
      const { mataikhoan } = req.params;
      const result = await DiaChiNguoiDungService.getByTaiKhoan(mataikhoan);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách địa chỉ",
      });
    }
  }

  // Lấy địa chỉ theo mã
  async getById(req, res) {
    try {
      const { id } = req.params;
      const diachi = await DiaChiNguoiDungService.getById(id);
      res.status(200).json({
        success: true,
        message: diachi.message,
        data: diachi.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy địa chỉ",
      });
    }
  }

  // Cập nhật địa chỉ
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await DiaChiNguoiDungService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật địa chỉ thất bại",
      });
    }
  }

  // Xóa địa chỉ
  async delete(req, res) {
    try {
      const { id } = req.params;
      await DiaChiNguoiDungService.delete(id);
      res.status(200).json({
        success: true,
        message: "Xóa địa chỉ thành công",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Xóa địa chỉ thất bại",
      });
    }
  }

  // Lấy địa chỉ mặc định của tài khoản
  async getMacDinhByTaiKhoan(req, res) {
    try {
      const { mataikhoan } = req.params;
      const result = await DiaChiNguoiDungService.getMacDinhByTaiKhoan(mataikhoan);
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy địa chỉ mặc định",
      });
    }
  }

  // Tạo địa chỉ mới và gán làm mặc định
  async createMacDinh(req, res) {
    try {
      const diachi = await DiaChiNguoiDungService.createAndSetDefault(req.body);
      res.status(201).json({
        success: true,
        message: diachi.message,
        data: diachi.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Tạo địa chỉ mặc định thất bại",
      });
    }
  }
}

module.exports = new DiaChiNguoiDungController;
