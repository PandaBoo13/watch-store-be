const DiaChiNguoiDungRepository = require("../infras/repositories/DiaChiNguoiDungRepository");

const DiaChiNguoiDungService = {
  // Tạo địa chỉ mới
  async create(data) {
    const diachi = await DiaChiNguoiDungRepository.createDiaChi(data);
    return {
      message: "Địa chỉ đã được tạo thành công",
      data: diachi
    };
  },

  // Lấy danh sách địa chỉ của người dùng
  async getByTaiKhoan(mataikhoan) {
    const list = await DiaChiNguoiDungRepository.findByTaiKhoan(mataikhoan);
    return {
      message: "Danh sách địa chỉ đã được lấy",
      data: list
    };
  },

  // Lấy chi tiết địa chỉ theo mã
  async getById(madiachi) {
    const diachi = await DiaChiNguoiDungRepository.findById(madiachi);
    if (!diachi) throw new Error("Không tìm thấy địa chỉ");
    return {
      message: "Lấy thông tin địa chỉ thành công",
      data: diachi
    };
  },

  // Cập nhật địa chỉ
  async update(madiachi, data) {
    const updated = await DiaChiNguoiDungRepository.updateDiaChi(madiachi, data);
    if (!updated) throw new Error("Cập nhật thất bại hoặc không tìm thấy địa chỉ");
    return {
      message: "Cập nhật địa chỉ thành công",
      data: updated
    };
  },

  // Xóa địa chỉ
  async delete(madiachi) {
    const success = await DiaChiNguoiDungRepository.deleteDiaChi(madiachi);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy địa chỉ");
    return {
      message: "Xóa địa chỉ thành công"
    };
  }
};

module.exports = DiaChiNguoiDungService;
