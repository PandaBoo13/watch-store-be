
const DanhMucDongHoRepository = require("../infras/repositories/DanhMucDongHoRepository");

const DanhMucDongHoService = {
  // Thêm danh mục mới
  async create(data) {
    const danhmuc = await DanhMucDongHoRepository.createDanhMuc(data);
    return {
      message: "Danh mục đã được tạo thành công",
      data: danhmuc
    };
  },

  // Lấy tất cả danh mục
  async getAll() {
    const list = await DanhMucDongHoRepository.findAll();
    return {
      message: "Danh sách danh mục đã được lấy",
      data: list
    };
  },

  // Lấy danh mục theo mã
  async getById(madanhmuc) {
    const danhmuc = await DanhMucDongHoRepository.findById(madanhmuc);
    if (!danhmuc) throw new Error("Không tìm thấy danh mục");
    return {
      message: "Lấy thông tin danh mục thành công",
      data: danhmuc
    };
  },

  // Cập nhật danh mục
  async update(madanhmuc, data) {
    const updated = await DanhMucDongHoRepository.updateDanhMuc(madanhmuc, data);
    if (!updated) throw new Error("Cập nhật thất bại hoặc không tìm thấy danh mục");
    return {
      message: "Cập nhật danh mục thành công",
      data: updated
    };
  },

  // Xóa danh mục
  async delete(madanhmuc) {
    const success = await DanhMucDongHoRepository.deleteDanhMuc(madanhmuc);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy danh mục");
    return {
      message: "Xóa danh mục thành công"
    };
  },
};

module.exports = DanhMucDongHoService;
