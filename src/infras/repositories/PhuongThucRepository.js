const pool = require("../db/mysql").promise();

class PhuongThuc {
  constructor(data) {
    Object.assign(this, data);
  }
}

const PhuongThucRepository = {
  // Tạo phương thức mới
  async create({ maphuongthuc, tenphuongthuc }) {
    const sql = `
      INSERT INTO phuongthucthanhtoan (maphuongthuc, tenphuongthuc)
      VALUES (?, ?)
    `;
    await pool.query(sql, [maphuongthuc, tenphuongthuc]);
    return await this.findById(maphuongthuc);
  },

  // Lấy tất cả phương thức thanh toán
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM phuongthucthanhtoan");
    return rows.map((row) => new PhuongThuc(row));
  },

  // Lấy 1 phương thức theo mã
  async findById(maphuongthuc) {
    const [rows] = await pool.query(
      "SELECT * FROM phuongthucthanhtoan WHERE maphuongthuc = ?",
      [maphuongthuc]
    );
    return rows.length > 0 ? new PhuongThuc(rows[0]) : null;
  },

  // Cập nhật phương thức
  async update(maphuongthuc, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const sql = `UPDATE phuongthucthanhtoan SET ${setClause} WHERE maphuongthuc = ?`;

    await pool.query(sql, [...values, maphuongthuc]);
    return await this.findById(maphuongthuc);
  },

  // Xóa phương thức
  async delete(maphuongthuc) {
    const [result] = await pool.query(
      "DELETE FROM phuongthucthanhtoan WHERE maphuongthuc = ?",
      [maphuongthuc]
    );
    return result.affectedRows > 0;
  },
};

module.exports = PhuongThucRepository;
