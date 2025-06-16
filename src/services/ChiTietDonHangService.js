const ChiTietDonHangRepository = require("../infras/repositories/ChiTietDonHangRepository");

const ChiTietDonHangService = {
  // Tạo mới chi tiết đơn hàng
  async create(data) {
    const chitiet = await ChiTietDonHangRepository.createChiTiet(data);
    return {
      message: "Tạo chi tiết đơn hàng thành công",
      data: chitiet,
    };
  },

  // Lấy tất cả chi tiết đơn hàng
  async getAll() {
    const list = await ChiTietDonHangRepository.findAll();
    return {
      message: "Lấy danh sách chi tiết đơn hàng thành công",
      data: list,
    };
  },

  // Lấy chi tiết theo mã đơn hàng
  async getByDonHangId(madonhang) {
    const list = await ChiTietDonHangRepository.findByDonHangId(madonhang);
    return {
      message: "Lấy chi tiết đơn hàng theo mã đơn thành công",
      data: list,
    };
  },

  // Lấy chi tiết theo mã chi tiết
  async getById(machitietdonhang) {
    const chitiet = await ChiTietDonHangRepository.findById(machitietdonhang);
    if (!chitiet) throw new Error("Không tìm thấy chi tiết đơn hàng");
    return {
      message: "Lấy chi tiết đơn hàng thành công",
      data: chitiet,
    };
  },

  // Cập nhật chi tiết đơn hàng
  async update(machitietdonhang, data) {
    const updated = await ChiTietDonHangRepository.update(machitietdonhang, data);
    if (!updated) throw new Error("Cập nhật thất bại hoặc không tìm thấy chi tiết đơn hàng");
    return {
      message: "Cập nhật chi tiết đơn hàng thành công",
      data: updated,
    };
  },

  // Xóa chi tiết đơn hàng
  async delete(machitietdonhang) {
    const success = await ChiTietDonHangRepository.delete(machitietdonhang);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy chi tiết đơn hàng");
    return {
      message: "Xóa chi tiết đơn hàng thành công",
    };
  }
};

module.exports = ChiTietDonHangService;
