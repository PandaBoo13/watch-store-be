const pool = require('../db/mysql').promise();

class UuDai {
  constructor(data) {
    Object.assign(this, data);
  }
}

const UuDaiRepository = {
  // Tạo mới ưu đãi
  async createUuDai({ mauudai, phantramgiam, ngaybatdau, ngayketthuc, trangthai }) {
    const sql = `
      INSERT INTO uudai (mauudai, phantramgiam, ngaybatdau, ngayketthuc, trangthai)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.query(sql, [mauudai, phantramgiam, ngaybatdau, ngayketthuc, trangthai]);
    return await this.findById(mauudai);
  },

  // Sinh mã ưu đãi không trùng
  async generateUniqueMaUuDai() {
    let id;
    let exists = true;

    while (exists) {
      id = 'UD' + Math.floor(1000 + Math.random() * 9000); // VD: UD4729
      const [rows] = await pool.query(
        'SELECT 1 FROM uudai WHERE mauudai = ?',
        [id]
      );
      exists = rows.length > 0;
    }

    return id;
  },

  // Lấy theo mã ưu đãi
  async findById(mauudai) {
    const [rows] = await pool.query(
      'SELECT * FROM uudai WHERE mauudai = ?',
      [mauudai]
    );
    return rows.length > 0 ? new UuDai(rows[0]) : null;
  },

  // Lấy tất cả ưu đãi
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM uudai');
    return rows.map(row => new UuDai(row));
  },

  // Cập nhật ưu đãi
  async updateUuDai(mauudai, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE uudai SET ${setClause} WHERE mauudai = ?`;

    await pool.query(sql, [...values, mauudai]);
    return await this.findById(mauudai);
  },

  // Xóa ưu đãi
  async deleteUuDai(mauudai) {
    const [result] = await pool.query(
      'DELETE FROM uudai WHERE mauudai = ?',
      [mauudai]
    );
    return result.affectedRows > 0;
  }
};

module.exports = UuDaiRepository;
