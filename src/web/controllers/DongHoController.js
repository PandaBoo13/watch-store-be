const DongHoService = require("../../services/DongHoService");

class DongHoController {
  async create(req, res) {
    try {
      const dongho = await DongHoService.create(req.body);
      res.status(201).json({
        success: true,
        message: dongho.message,
        data: dongho.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Thêm đồng hồ thất bại",
      });
    }
  }

  async getAll(req, res) {
    try {
      const list = await DongHoService.getAll();
      res.status(200).json({
        success: true,
        message: list.message,
        data: list.data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Không thể lấy danh sách đồng hồ",
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const dongho = await DongHoService.getById(id);
      res.status(200).json({
        success: true,
        message: dongho.message,
        data: dongho.data,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message || "Không tìm thấy đồng hồ",
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await DongHoService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: updated.message,
        data: updated.data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Cập nhật đồng hồ thất bại",
      });
    }
  }

async delete(req, res) {
  try {
    const { id } = req.params;
    await DongHoService.delete(id);
    res.status(200).json({
      success: true,
      message: "Xóa đồng hồ thành công",
    });
  } catch (err) {
    let message = "Không thể xoá model vì đang được sử dụng trong sản phẩm.";
    
    // Nếu là lỗi ràng buộc khóa ngoại
    if (err.code === "ER_ROW_IS_REFERENCED_2") {
      message = "Không thể xoá model vì đang được sử dụng trong sản phẩm.";
    }

    res.status(400).json({
      success: false,
      message,
    });
  }
}

}

module.exports = new DongHoController;
