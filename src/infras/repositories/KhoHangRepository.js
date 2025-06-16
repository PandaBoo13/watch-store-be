const pool = require('../db/mysql').promise();

// Hàm tạo mã kho hàng không trùng
function generateMaKhoHang() {
  return 'KHO' + Date.now(); // Ví dụ: KHO1718552000000
}

// Class đối tượng kho hàng
class KhoHang {
  constructor(data) {
    Object.assign(this, data);
  }
}

const KhoHangRepository = {
  // Thêm bản ghi kho hàng
  async createKhoHang({ madongho, soluongnhap, ghichu = '' }) {
    const makhohang = generateMaKhoHang();
    const ngaynhap = new Date();

    const sql = `
      INSERT INTO khohang (
        makhohang, madongho, soluongnhap, soluongconlai, ngaynhap, ghichu
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      makhohang, madongho, soluongnhap, soluongnhap, ngaynhap, ghichu
    ]);

    return await this.findById(makhohang);
  },

  // Lấy 1 kho hàng theo mã
  async findById(makhohang) {
    const [rows] = await pool.query('SELECT * FROM khohang WHERE makhohang = ?', [makhohang]);
    return rows.length > 0 ? new KhoHang(rows[0]) : null;
  },

  // Lấy tất cả bản ghi kho hàng
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM khohang ORDER BY ngaynhap DESC');
    return rows.map(row => new KhoHang(row));
  },

  // Cập nhật kho hàng (chỉ cập nhật các trường được cung cấp)
  async updateKhoHang(makhohang, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE khohang SET ${setClause} WHERE makhohang = ?`;

    await pool.query(sql, [...values, makhohang]);
    return await this.findById(makhohang);
  },

  // Xóa kho hàng
  async deleteKhoHang(makhohang) {
    const sql = 'DELETE FROM khohang WHERE makhohang = ?';
    const [result] = await pool.query(sql, [makhohang]);
    return result.affectedRows > 0;
  },

  // Lấy tất cả lần nhập của 1 dòng đồng hồ
  async findByDongHo(madongho) {
    const [rows] = await pool.query('SELECT * FROM khohang WHERE madongho = ? ORDER BY ngaynhap DESC', [madongho]);
    return rows.map(row => new KhoHang(row));
  }
};

module.exports = KhoHangRepository;
