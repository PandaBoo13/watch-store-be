const NguoiDungService = require('../../services/NguoiDungService');

class NguoiDungController {
  async dangKy(req, res, next) {
    try {
      const { email, matkhau } = req.body;

      if (!email || !matkhau) {
        return res.status(400).json({
          thanhcong: false,
          thongbao: "Email và mật khẩu là bắt buộc",
        });
      }

      const nguoidung = await NguoiDungService.dangKy(req.body);
      res.status(201).json({
        thanhcong: true,
        thongbao: "Đăng ký thành công",
        duLieu: nguoidung,
      });
    } catch (err) {
      res.status(400).json({
        thanhcong: false,
        thongbao: err.message || "Đăng ký thất bại",
      });
    }
  }

  async dangNhap(req, res, next) {
    try {
      const { email, matkhau } = req.body;

      if (!email || !matkhau) {
        return res.status(400).json({
          thanhcong: false,
          thongbao: "Email và mật khẩu là bắt buộc",
        });
      }

      const ketqua = await NguoiDungService.dangNhap({ email, matkhau });
      res.status(200).json({
        thanhcong: true,
        thongbao: ketqua.thongbao,
        duLieu: ketqua.nguoidung,
      });
    } catch (err) {
      res.status(401).json({
        thanhcong: false,
        thongbao: err.message || "Đăng nhập thất bại",
      });
    }
  }
}

module.exports = new NguoiDungController;
