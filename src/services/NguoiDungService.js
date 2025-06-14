const NguoiDungRepository = require("../infras/repositories/NguoiDungRepository");
const bcrypt = require("bcrypt");

const NguoiDungService = {
  async dangKy(duLieu) {
    const { email, matkhau, hoten, sodienthoai } = duLieu;

    // Kiểm tra email đã tồn tại chưa
    const tonTai = await NguoiDungRepository.timBangEmail(email);
    if (tonTai) throw new Error("Email đã tồn tại");

    // Tạo tài khoản mới
    await NguoiDungRepository.taoTaiKhoan({ email, matkhau, hoten, sodienthoai });
    return { thongbao: "Đăng ký thành công" };
  },

  async dangNhap(duLieu) {
    const { email, matkhau } = duLieu;

    // Lấy thông tin người dùng có cả mật khẩu
    const nguoidung = await NguoiDungRepository.timNguoiDungVaMatKhau(email);
    if (!nguoidung) throw new Error("Không tìm thấy email");

    // So sánh mật khẩu đã mã hóa
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
};

module.exports = NguoiDungService;
