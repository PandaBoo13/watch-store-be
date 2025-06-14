const WatchRepository = require("../infras/repositories/WatchRepository");

const WatchService = {
  // Thêm đồng hồ mới
  async create(data) {
    const watch = await WatchRepository.createWatch(data);
    return {
      message: "Watch created successfully",
      data: watch
    };
  },

  // Lấy tất cả đồng hồ
  async getAll() {
    const watches = await WatchRepository.findAll();
    return {
      message: "Watch list retrieved",
      data: watches
    };
  },

  // Lấy đồng hồ theo productid
  async getById(productid) {
    const watch = await WatchRepository.findById(productid);
    if (!watch) throw new Error("Watch not found");
    return {
      message: "Watch retrieved",
      data: watch
    };
  },

  // Cập nhật đồng hồ
  async update(productid, data) {
    const updated = await WatchRepository.updateWatch(productid, data);
    if (!updated) throw new Error("Update failed or watch not found");
    return {
      message: "Watch updated successfully",
      data: updated
    };
  },

  // Xóa đồng hồ
  async delete(productid) {
    const success = await WatchRepository.deleteWatch(productid);
    if (!success) throw new Error("Delete failed or watch not found");
    return {
      message: "Watch deleted successfully"
    };
  },
};

module.exports = WatchService;
