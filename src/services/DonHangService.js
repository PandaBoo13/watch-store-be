const DonHangRepository = require("../infras/repositories/DonHangRepository");

const DonHangService = {
  // Tạo đơn hàng mới
  async create(data) {
    const donhang = await DonHangRepository.createDonHang(data);
    return {
      message: "Đơn hàng đã được tạo thành công",
      data: donhang,
    };
  },

  // Lấy tất cả đơn hàng (có thể lọc theo người dùng, trạng thái, ...)
  async getAll(filters = {}) {
    const list = await DonHangRepository.findAllWithFilter(filters);
    return {
      message: "Lấy danh sách đơn hàng thành công",
      data: list,
    };
  },

  // Lấy đơn hàng theo mã
  async getById(madonhang) {
    const donhang = await DonHangRepository.findById(madonhang);
    if (!donhang) throw new Error("Không tìm thấy đơn hàng");
    return {
      message: "Lấy thông tin đơn hàng thành công",
      data: donhang,
    };
  },

  // Cập nhật trạng thái đơn hàng
  async updateTrangThai(madonhang, trangthai) {
    const updated = await DonHangRepository.updateTrangThai(madonhang, trangthai);
    if (!updated) throw new Error("Cập nhật trạng thái thất bại hoặc không tìm thấy đơn hàng");
    return {
      message: "Cập nhật trạng thái đơn hàng thành công",
      data: updated,
    };
  },

  // Xoá đơn hàng
  async delete(madonhang) {
    const success = await DonHangRepository.deleteDonHang(madonhang);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy đơn hàng");
    return {
      message: "Xóa đơn hàng thành công",
    };
  }
};

module.exports = DonHangService;
