const pool = require("../db/mysql").promise();

// Danh mục đồng hồ entity
class DanhMucDongHo {
  constructor(data) {
    Object.assign(this, data);
  }
}

const DanhMucDongHoRepository = {
  // Thêm danh mục mới
  async createDanhMuc({ madanhmuc, tendanhmuc, dacdiem }) {
    const existing = await this.findById(madanhmuc);
    if (existing) {
      throw new Error("Mã danh mục đã tồn tại.");
    }

    const sql = `
  INSERT INTO danhmucdongho (tendanhmuc, dacdiem)
  VALUES (?, ?)
`;
    const [result] = await pool.query(sql, [tendanhmuc, dacdiem]);
    return await this.findById(result.insertId);
  },

  // Tìm theo mã danh mục
  async findById(madanhmuc) {
    const [rows] = await pool.query(
      "SELECT * FROM danhmucdongho WHERE madanhmuc = ?",
      [madanhmuc]
    );
    return rows.length > 0 ? new DanhMucDongHo(rows[0]) : null;
  },

  // Lấy tất cả danh mục
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM danhmucdongho");
    return rows.map((row) => new DanhMucDongHo(row));
  },

  // Cập nhật thông tin danh mục
  async updateDanhMuc(madanhmuc, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const sql = `UPDATE danhmucdongho SET ${setClause} WHERE madanhmuc = ?`;

    await pool.query(sql, [...values, madanhmuc]);
    return await this.findById(madanhmuc);
  },

  // Xóa danh mục
  async deleteDanhMuc(madanhmuc) {
    // Kiểm tra xem có sản phẩm nào tham chiếu đến không
    const [donghos] = await pool.query(
      "SELECT COUNT(*) AS count FROM dongho WHERE madanhmuc = ?",
      [madanhmuc]
    );

    if (donghos[0].count > 0) {
      throw new Error("Không thể xoá. Danh mục đang được sử dụng.");
    }

    const sql = "DELETE FROM danhmucdongho WHERE madanhmuc = ?";
    const [result] = await pool.query(sql, [madanhmuc]);
    return result.affectedRows > 0;
  },
};

module.exports = DanhMucDongHoRepository;
