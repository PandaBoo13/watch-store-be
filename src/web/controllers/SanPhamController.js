const SanPhamService = require("../../services/SanPhamService");

class SanPhamController {
  // Thêm sản phẩm
  async create(req, res) {
    try {
      const sanpham = await SanPhamService.create(req.body);
      res.status(201).json({
        success: true,
        message: sanpham.message,
        data: sanpham.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm sản phẩm thất bại",
      });
    }
  }

  // Lấy tất cả sản phẩm
  async getAll(req, res) {
    try {
      const list = await SanPhamService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách sản phẩm",
      });
    }
  }
  async getByFilter(req, res) {
    try {
      const filters = req.query; // Lấy điều kiện từ URL query
      const list = await SanPhamService.getByFilter(filters);
      res.status(200).json({
        success: true,
        message: "Lọc sản phẩm thành công",
        data: list.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Lọc sản phẩm thất bại",
      });
    }
  }
  // Lấy danh sách sản phẩm bán chạy
  async layDanhSachBestseller(req, res) {
    try {
      const data = await SanPhamService.getBestsellerSanPham();
      res.status(200).json({
        success: true,
        message: "Lấy sản phẩm bán chạy thành công",
        data: data.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Lỗi server",
      });
    }
  }
  async layDongHoNam(req, res) {
    try {
      console.log("Đã vào hàm getDongHoNam");

      const result = await SanPhamService.getDongHoNam();

      console.log("Dữ liệu truy vấn được:", result.data);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Lỗi khi lấy đồng hồ nam:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi truy vấn sản phẩm nam",
      });
    }
  }
  async layDongHoNu(req, res) {
    try {
      console.log("Đã vào hàm getDongHoNu");

      const result = await SanPhamService.getDongHoNu();

      console.log("Dữ liệu truy vấn được:", result.data);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Lỗi khi lấy đồng hồ nữ:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi truy vấn sản phẩm nữ",
      });
    }
  }

  // Lấy sản phẩm theo mã
  async getById(req, res) {
    try {
      const { id } = req.params;
      const sanpham = await SanPhamService.getById(id);
      res.status(200).json({
        success: true,
        message: sanpham.message,
        data: sanpham.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy sản phẩm",
      });
    }
  }

  // Cập nhật sản phẩm
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await SanPhamService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật sản phẩm thất bại",
      });
    }
  }

  // Xóa sản phẩm
async delete(req, res) {
  try {
    const { id } = req.params;
    await SanPhamService.delete(id);
    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (err) {
    // Nếu lỗi là do sản phẩm từng được đặt
    if (
      err.message &&
      err.message.includes("được sử dụng trong đơn hàng")
    ) {
      return res.status(409).json({
        success: false,
        message: err.message, // "Sản phẩm đã từng được đặt, không thể xóa."
      });
    }

    // Các lỗi khác (lỗi server, không tìm thấy, ...)
    res.status(400).json({
      success: false,
      message: err.message || "Xóa sản phẩm thất bại",
    });
  }
}



  async getDetail(req, res) {
  try {
    const { id } = req.params;
    const result = await SanPhamService.getFullDetail(id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message || "Không tìm thấy chi tiết sản phẩm"
    });
  }
}

  // Lấy giá bán của sản phẩm theo mã
  async layGiaSanPham(req, res) {
  try {
    const { id } = req.params;
    const result = await SanPhamService.getPriceById(id);
    res.status(200).json({
      success: true,
      message: result.message,
      giaban: result.giaban,
      tensanpham: result.tensanpham, // ✅ Thêm dòng này
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message || "Không tìm thấy giá sản phẩm",
    });
  }
}


  
}

module.exports = new SanPhamController;
