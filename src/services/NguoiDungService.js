const NguoiDungRepository = require("../infras/repositories/NguoiDungRepository");
const bcrypt = require("bcrypt");

const NguoiDungService = {
  // Đăng ký tài khoản mới
  async dangKy({ email, matkhau, hoten, sodienthoai }) {
    const tonTai = await NguoiDungRepository.timBangEmail(email);
    if (tonTai) throw new Error("Email đã tồn tại");

    await NguoiDungRepository.taoTaiKhoan({
      email,
      matkhau,
      hoten,
      sodienthoai,
    });

    return { thongbao: "Đăng ký thành công" };
  },

  // Đăng nhập
  async dangNhap({ email, matkhau }) {
    const nguoidung = await NguoiDungRepository.timNguoiDungVaMatKhau(email);
    if (!nguoidung) throw new Error("Không tìm thấy email");

    const dung = await bcrypt.compare(matkhau, nguoidung.matkhau);
    if (!dung) throw new Error("Sai mật khẩu");

    return {
      thongbao: "Đăng nhập thành công",
      nguoidung: {
        mataikhoan: nguoidung.mataikhoan,
        hoten: nguoidung.hoten,
        vaitro: nguoidung.vaitro,
      },
    };
  },

  // Lấy thông tin người dùng theo ID
  async layNguoiDungTheoId(id) {
    const nguoidung = await NguoiDungRepository.layNguoiDungTheoId(id);
    if (!nguoidung) throw new Error("Không tìm thấy người dùng");
    return nguoidung;
  },

  // Cập nhật thông tin người dùng
  async capNhatThongTin(id, duLieuMoi) {
    const thanhCong = await NguoiDungRepository.capNhatThongTin(id, duLieuMoi);
    if (!thanhCong) throw new Error("Cập nhật thất bại");
    return { thongbao: "Cập nhật thành công" };
  },

  // Đổi mật khẩu
  async doiMatKhau(mataikhoan, matkhauCu, matkhauMoi) {
    const nguoidung = await NguoiDungRepository.timNguoiDungVaMatKhauTheoId(mataikhoan);
    if (!nguoidung) throw new Error("Không tìm thấy tài khoản");

    const dung = await bcrypt.compare(matkhauCu, nguoidung.matkhau);
    if (!dung) throw new Error("Mật khẩu cũ không đúng");

    const thanhCong = await NguoiDungRepository.doiMatKhau(mataikhoan, matkhauMoi);
    if (!thanhCong) throw new Error("Đổi mật khẩu thất bại");

    return { thongbao: "Đổi mật khẩu thành công" };
  },

  // Xóa tài khoản người dùng
  async xoaNguoiDung(mataikhoan) {
    const thanhCong = await NguoiDungRepository.xoaNguoiDung(mataikhoan);
    if (!thanhCong) throw new Error("Xóa thất bại");
    return { thongbao: "Xóa thành công" };
  },

  // Lấy tất cả người dùng
  async layTatCaNguoiDung() {
    const ds = await NguoiDungRepository.layTatCaNguoiDung();
    return ds;
  },

  
};

module.exports = NguoiDungService;
