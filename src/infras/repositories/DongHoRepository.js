const pool = require('../db/mysql').promise();

// Hàm tạo mã 6 chữ số không trùng
async function generateUniqueDongHoId() {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(100000 + Math.random() * 900000); // Số ngẫu nhiên từ 100000 đến 999999
    const [rows] = await pool.query('SELECT 1 FROM dongho WHERE madongho = ?', [id]);
    exists = rows.length > 0;
  }

  return id.toString();
}

// Watch entity constructor
class DongHo {
  constructor(data) {
    Object.assign(this, data);
  }
}

const DongHoRepository = {
  // Tạo sản phẩm đồng hồ mới
  async createDongHo({
    tenmodel,
    madanhmuc,
    chatlieuvo,
    chatlieuday,
    mauday,
    duongkinh,
    doday,
    chongnuoc,
    dongco,
    mausomatso,
    gioitinh
  }) {
    const madongho = await generateUniqueDongHoId();

    const sql = `
      INSERT INTO dongho (
        madongho, tenmodel, madanhmuc, chatlieuvo, chatlieuday,
        mauday, duongkinh, doday, chongnuoc, dongco, mausomatso, gioitinh
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      madongho, tenmodel, madanhmuc, chatlieuvo, chatlieuday,
      mauday, duongkinh, doday, chongnuoc, dongco, mausomatso, gioitinh
    ]);

    return await this.findById(madongho);
  },

  // Tìm theo mã đồng hồ
  async findById(madongho) {
    const [rows] = await pool.query('SELECT * FROM dongho WHERE madongho = ?', [madongho]);
    return rows.length > 0 ? new DongHo(rows[0]) : null;
  },

  // Lấy tất cả sản phẩm
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM dongho');
    return rows.map(row => new DongHo(row));
  },

  // Cập nhật thông tin
  async updateDongHo(madongho, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE dongho SET ${setClause} WHERE madongho = ?`;

    await pool.query(sql, [...values, madongho]);
    return await this.findById(madongho);
  },

  // Xóa sản phẩm
  async deleteDongHo(madongho) {
    const sql = 'DELETE FROM dongho WHERE madongho = ?';
    const [result] = await pool.query(sql, [madongho]);
    return result.affectedRows > 0;
  }
};

module.exports = DongHoRepository;
