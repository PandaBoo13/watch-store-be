const DongHoRepository = require("../infras/repositories/DongHoRepository");

const DongHoService = {
  // Thêm đồng hồ mới
  async create(data) {
    const dongho = await DongHoRepository.createDongHo(data);
    return {
      message: "Đồng hồ đã được tạo thành công",
      data: dongho
    };
  },

  // Lấy tất cả đồng hồ
  async getAll() {
    const list = await DongHoRepository.findAll();
    return {
      message: "Danh sách đồng hồ đã được lấy",
      data: list
    };
  },

  // Lấy đồng hồ theo madongho
  async getById(madongho) {
    const dongho = await DongHoRepository.findById(madongho);
    if (!dongho) throw new Error("Không tìm thấy đồng hồ");
    return {
      message: "Lấy thông tin đồng hồ thành công",
      data: dongho
    };
  },

  // Cập nhật đồng hồ
  async update(madongho, data) {
    const updated = await DongHoRepository.updateDongHo(madongho, data);
    if (!updated) throw new Error("Cập nhật thất bại hoặc không tìm thấy đồng hồ");
    return {
      message: "Cập nhật đồng hồ thành công",
      data: updated
    };
  },

  // Xóa đồng hồ
  async delete(madongho) {
    const success = await DongHoRepository.deleteDongHo(madongho);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy đồng hồ");
    return {
      message: "Xóa đồng hồ thành công"
    };
  },
};

module.exports = DongHoService;
