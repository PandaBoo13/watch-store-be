const KhoHangRepository = require("../infras/repositories/KhoHangRepository");

const KhoHangService = {
  // Thêm lần nhập kho mới
  async create(data) {
    const kho = await KhoHangRepository.createKhoHang(data);
    return {
      message: "Nhập kho thành công",
      data: kho
    };
  },

  // Lấy tất cả dòng kho hàng
  async getAll() {
    const list = await KhoHangRepository.findAll();
    return {
      message: "Danh sách kho hàng đã được lấy",
      data: list
    };
  },

  // Lấy chi tiết kho theo makhohang
  async getById(makhohang) {
    const kho = await KhoHangRepository.findById(makhohang);
    if (!kho) throw new Error("Không tìm thấy thông tin kho hàng");
    return {
      message: "Lấy thông tin kho hàng thành công",
      data: kho
    };
  },

  // Cập nhật kho hàng
  async update(makhohang, data) {
    const updated = await KhoHangRepository.updateKhoHang(makhohang, data);
    if (!updated) throw new Error("Cập nhật kho thất bại hoặc không tìm thấy");
    return {
      message: "Cập nhật kho hàng thành công",
      data: updated
    };
  },

  // Xóa kho hàng
  async delete(makhohang) {
    const success = await KhoHangRepository.deleteKhoHang(makhohang);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy kho hàng");
    return {
      message: "Xóa kho hàng thành công"
    };
  },

  // Lấy tất cả lần nhập theo mã đồng hồ
  async getByDongHo(madongho) {
    const list = await KhoHangRepository.findByDongHo(madongho);
    return {
      message: `Danh sách nhập kho của đồng hồ ${madongho}`,
      data: list
    };
  }
};

module.exports = KhoHangService;
