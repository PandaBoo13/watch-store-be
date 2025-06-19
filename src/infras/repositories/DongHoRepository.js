const pool = require('../db/mysql').promise();

// Hàm tạo mã 6 chữ số không trùng
// Tạo mã mới tăng dần theo định dạng DH000001, DH000002, ...
async function generateUniqueDongHoId() {
  const [rows] = await pool.query(`
    SELECT madongho FROM dongho 
    WHERE madongho LIKE 'DH%' 
    ORDER BY madongho DESC 
    LIMIT 1
  `);

  let newIdNumber = 1;

  if (rows.length > 0) {
    const lastId = rows[0].madongho; // VD: DH000123
    const numberPart = parseInt(lastId.substring(2)); // cắt bỏ 'DH', lấy 000123 => 123
    newIdNumber = numberPart + 1;
  }

  const newId = 'DH' + newIdNumber.toString().padStart(6, '0');
  return newId;
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
  try {
    const sql = 'DELETE FROM dongho WHERE madongho = ?';
    const [result] = await pool.query(sql, [madongho]);
    if (result.affectedRows === 0) throw new Error("Không tìm thấy đồng hồ để xóa");
    return true;
  } catch (err) {
    // Nếu là lỗi do khóa ngoại
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      const error = new Error("Không thể xóa vì đồng hồ này đang được dùng trong bảng sản phẩm.");
      error.status = 400;
      throw error;
    }
    throw err;
  }
}

};

module.exports = DongHoRepository;
