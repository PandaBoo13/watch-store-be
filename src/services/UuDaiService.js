const UuDaiRepository = require("../infras/repositories/UuDaiRepository");

const UuDaiService = {
  // Tạo mới ưu đãi
  async create(data) {
    const mauudai = await UuDaiRepository.generateUniqueMaUuDai();
    const uudai = await UuDaiRepository.createUuDai({ ...data, mauudai });
    return {
      message: "Ưu đãi đã được tạo thành công",
      data: uudai
    };
  },

  // Lấy tất cả ưu đãi
  async getAll() {
    const list = await UuDaiRepository.findAll();
    return {
      message: "Lấy danh sách ưu đãi thành công",
      data: list
    };
  },

  // Lấy ưu đãi theo mã
  async getById(mauudai) {
    const uudai = await UuDaiRepository.findById(mauudai);
    if (!uudai) throw new Error("Không tìm thấy ưu đãi");
    return {
      message: "Lấy thông tin ưu đãi thành công",
      data: uudai
    };
  },

  // Cập nhật ưu đãi
  async update(mauudai, data) {
    const updated = await UuDaiRepository.updateUuDai(mauudai, data);
    if (!updated) throw new Error("Cập nhật thất bại hoặc không tìm thấy ưu đãi");
    return {
      message: "Cập nhật ưu đãi thành công",
      data: updated
    };
  },

  // Xóa ưu đãi
  async delete(mauudai) {
    const success = await UuDaiRepository.deleteUuDai(mauudai);
    if (!success) throw new Error("Xóa thất bại hoặc không tìm thấy ưu đãi");
    return {
      message: "Xóa ưu đãi thành công"
    };
  }
};

module.exports = UuDaiService;
