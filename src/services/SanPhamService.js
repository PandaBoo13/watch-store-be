const SanPhamRepository = require("../infras/repositories/SanPhamRepository");

const SanPhamService = {
  // Thêm sản phẩm mới
  async create(data) {
    const sanpham = await SanPhamRepository.createSanPham(data);
    return {
      message: "Sản phẩm đã được tạo thành công",
      data: sanpham,
    };
  },

  // Lấy tất cả sản phẩm
  async getAll() {
    const list = await SanPhamRepository.findAll();
    return {
      message: "Danh sách sản phẩm đã được lấy",
      data: list,
    };
  },

  // Lấy sản phẩm theo masanpham
  async getById(masanpham) {
    const sanpham = await SanPhamRepository.findById(masanpham);
    if (!sanpham) throw new Error("Không tìm thấy sản phẩm");
    return {
      message: "Lấy thông tin sản phẩm thành công",
      data: sanpham,
    };
  },
  async getByFilter(filters) {
    const data = await SanPhamRepository.findAllWithFilter(filters);
    return {
      message: "Đã lọc sản phẩm thành công",
      data,
    };
  },

  // Cập nhật sản phẩm
  async update(masanpham, data) {
    const updated = await SanPhamRepository.updateSanPham(masanpham, data);
    if (!updated)
      throw new Error("Cập nhật thất bại hoặc không tìm thấy sản phẩm");
    return {
      message: "Cập nhật sản phẩm thành công",
      data: updated,
    };
  },

  // Xóa sản phẩm
  async delete(masanpham) {
    const success = await SanPhamRepository.deleteSanPham(masanpham);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy sản phẩm");
    return {
      message: "Xóa sản phẩm thành công",
    };
  },
};

module.exports = SanPhamService;
