const pool = require("../db/mysql").promise();

class ChiTietDonHang {
  constructor(data) {
    Object.assign(this, data);
  }
}

const ChiTietDonHangRepository = {
  // Tạo chi tiết đơn hàng mới
  async createChiTiet({ madonhang, masanpham, soluong, giaban }) {
    const machitietdonhang = await this.generateUniqueId();

    const sql = `
      INSERT INTO chitietdonhang (
        machitietdonhang, madonhang, masanpham, soluong, giaban
      ) VALUES (?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      machitietdonhang,
      madonhang,
      masanpham,
      soluong,
      giaban
    ]);

    return await this.findById(machitietdonhang);
  },

  // Sinh mã chi tiết không trùng
  async generateUniqueId() {
    let id;
    let exists = true;

    while (exists) {
      id = "CT" + Math.floor(100000 + Math.random() * 900000);
      const [rows] = await pool.query(
        "SELECT 1 FROM chitietdonhang WHERE machitietdonhang = ?",
        [id]
      );
      exists = rows.length > 0;
    }

    return id;
  },

  // Lấy chi tiết theo mã
  async findById(machitietdonhang) {
    const [rows] = await pool.query(
      "SELECT * FROM chitietdonhang WHERE machitietdonhang = ?",
      [machitietdonhang]
    );
    return rows.length > 0 ? new ChiTietDonHang(rows[0]) : null;
  },

  // Lấy tất cả chi tiết của 1 đơn hàng
  async findByDonHangId(madonhang) {
    const [rows] = await pool.query(
      `
      SELECT 
        ct.*, sp.tensanpham, sp.hinhanhchinh
      FROM chitietdonhang ct
      JOIN sanpham sp ON ct.masanpham = sp.masanpham
      WHERE ct.madonhang = ?
      `,
      [madonhang]
    );
    return rows.map((row) => new ChiTietDonHang(row));
  },

  // Lấy toàn bộ chi tiết đơn hàng
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM chitietdonhang");
    return rows.map((row) => new ChiTietDonHang(row));
  },

  // Cập nhật chi tiết đơn hàng
  async update(machitietdonhang, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const sql = `UPDATE chitietdonhang SET ${setClause} WHERE machitietdonhang = ?`;

    await pool.query(sql, [...values, machitietdonhang]);
    return await this.findById(machitietdonhang);
  },

  // Xóa chi tiết đơn hàng
  async delete(machitietdonhang) {
    const [result] = await pool.query(
      "DELETE FROM chitietdonhang WHERE machitietdonhang = ?",
      [machitietdonhang]
    );
    return result.affectedRows > 0;
  },
};

module.exports = ChiTietDonHangRepository;
