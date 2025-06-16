const GioHangRepository = require("../infras/repositories/GioHangRepository");

const GioHangService = {
  async add(data) {
    const cartItem = await GioHangRepository.add(data);
    return {
      message: "Thêm vào giỏ hàng thành công",
      data: cartItem
    };
  },

  async getByTaiKhoan(mataikhoan) {
    const list = await GioHangRepository.findByTaiKhoan(mataikhoan);
    return {
      message: "Lấy giỏ hàng thành công",
      data: list
    };
  },

  async delete(magiohang) {
    const success = await GioHangRepository.delete(magiohang);
    if (!success) throw new Error("Không tìm thấy hoặc không thể xoá");
    return {
      message: "Xoá sản phẩm khỏi giỏ hàng thành công"
    };
  },

  async updateQuantity(magiohang, soluong) {
    const updated = await GioHangRepository.updateQuantity(magiohang, soluong);
    if (!updated) throw new Error("Không tìm thấy sản phẩm trong giỏ");
    return {
      message: "Cập nhật số lượng thành công",
      data: updated
    };
  }
};

module.exports = GioHangService;
