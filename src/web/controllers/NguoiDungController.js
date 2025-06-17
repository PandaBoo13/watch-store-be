const NguoiDungService = require('../../services/NguoiDungService');

class NguoiDungController {
  // Đăng ký
  async dangKy(req, res) {
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

  // Đăng nhập
  async dangNhap(req, res) {
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
        token: ketqua.token // 👉 gửi token về cho client
      });
    } catch (err) {
      res.status(401).json({
        thanhcong: false,
        thongbao: err.message || "Đăng nhập thất bại",
      });
    }
  }

  // Lấy thông tin người dùng
  async layNguoiDung(req, res) {
    try {
      const { id } = req.params;
      const nguoidung = await NguoiDungService.layNguoiDungTheoId(id);
      res.status(200).json({
        thanhcong: true,
        duLieu: nguoidung,
      });
    } catch (err) {
      res.status(404).json({
        thanhcong: false,
        thongbao: err.message || "Không tìm thấy người dùng",
      });
    }
  }

  // Cập nhật thông tin người dùng
  async capNhatThongTin(req, res) {
    try {
      const { id } = req.params;
      const thanhcong = await NguoiDungService.capNhatThongTin(id, req.body);
      res.status(200).json({
        thanhcong: true,
        thongbao: "Cập nhật thành công",
      });
    } catch (err) {
      res.status(400).json({
        thanhcong: false,
        thongbao: err.message || "Cập nhật thất bại",
      });
    }
  }

  // Đổi mật khẩu
  async doiMatKhau(req, res) {
    try {
      const { mataikhoan, matkhauCu, matkhauMoi } = req.body;

      if (!mataikhoan || !matkhauCu || !matkhauMoi) {
        return res.status(400).json({
          thanhcong: false,
          thongbao: "Thiếu thông tin đổi mật khẩu",
        });
      }

      const kq = await NguoiDungService.doiMatKhau(mataikhoan, matkhauCu, matkhauMoi);
      res.status(200).json({
        thanhcong: true,
        thongbao: kq.thongbao,
      });
    } catch (err) {
      res.status(400).json({
        thanhcong: false,
        thongbao: err.message || "Đổi mật khẩu thất bại",
      });
    }
  }

  // Xóa người dùng
  async xoaNguoiDung(req, res) {
    try {
      const { id } = req.params;
      const ketqua = await NguoiDungService.xoaNguoiDung(id);
      res.status(200).json({
        thanhcong: true,
        thongbao: ketqua.thongbao,
      });
    } catch (err) {
      res.status(400).json({
        thanhcong: false,
        thongbao: err.message || "Xóa thất bại",
      });
    }
  }

    // Lấy tất cả người dùng
  async layTatCaNguoiDung(req, res) {
    try {
      const danhSach = await NguoiDungService.layTatCaNguoiDung();
      res.status(200).json({
        thanhcong: true,
        duLieu: danhSach,
      });
    } catch (err) {
      res.status(500).json({
        thanhcong: false,
        thongbao: err.message || "Không thể lấy danh sách người dùng",
      });
    }
  }

}





module.exports = new NguoiDungController;
