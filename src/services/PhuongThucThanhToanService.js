const PhuongThucRepository = require("../infras/repositories/PhuongThucRepository");

const PhuongThucThanhToanService = {
  // Tạo phương thức thanh toán mới
  async create(data) {
    const pt = await PhuongThucRepository.create(data);
    return {
      message: "Phương thức thanh toán đã được tạo thành công",
      data: pt,
    };
  },

  // Lấy tất cả phương thức thanh toán
  async getAll() {
    const list = await PhuongThucRepository.findAll();
    return {
      message: "Danh sách phương thức thanh toán đã được lấy",
      data: list,
    };
  },

  // Lấy phương thức theo mã
  async getById(maphuongthuc) {
    const pt = await PhuongThucRepository.findById(maphuongthuc);
    if (!pt) throw new Error("Không tìm thấy phương thức thanh toán");
    return {
      message: "Lấy thông tin phương thức thanh toán thành công",
      data: pt,
    };
  },

  // Cập nhật phương thức thanh toán
  async update(maphuongthuc, data) {
    const updated = await PhuongThucRepository.update(maphuongthuc, data);
    if (!updated)
      throw new Error("Cập nhật thất bại hoặc không tìm thấy phương thức");
    return {
      message: "Cập nhật phương thức thanh toán thành công",
      data: updated,
    };
  },

  // Xóa phương thức thanh toán
  async delete(maphuongthuc) {
    const success = await PhuongThucRepository.delete(maphuongthuc);
    if (!success)
      throw new Error("Xóa thất bại hoặc không tìm thấy phương thức thanh toán");
    return {
      message: "Xóa phương thức thanh toán thành công",
    };
  },
};

module.exports = PhuongThucThanhToanService;
