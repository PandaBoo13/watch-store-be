const pool = require('../db/mysql').promise();

class GioHang {
  constructor(data) {
    Object.assign(this, data);
  }
}

const GioHangRepository = {
  // Sinh mã giỏ hàng ngẫu nhiên không trùng
  async generateUniqueGioHangId() {
    let id;
    let exists = true;

    while (exists) {
      id = 'GH' + Math.floor(100000 + Math.random() * 900000);
      const [rows] = await pool.query('SELECT 1 FROM giohang WHERE magiohang = ?', [id]);
      exists = rows.length > 0;
    }

    return id;
  },

  // Thêm sản phẩm vào giỏ
  async add({ mataikhoan, masanpham, soluong }) {
    const magiohang = await this.generateUniqueGioHangId();
    const ngaythem = new Date();

    const sql = `
      INSERT INTO giohang (magiohang, mataikhoan, masanpham, soluong, ngaythem)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.query(sql, [magiohang, mataikhoan, masanpham, soluong, ngaythem]);

    return {
      magiohang,
      mataikhoan,
      masanpham,
      soluong,
      ngaythem
    };
  },

  // Lấy tất cả sản phẩm trong giỏ của 1 tài khoản
  async findByTaiKhoan(mataikhoan) {
    const [rows] = await pool.query(
      `SELECT * FROM giohang WHERE mataikhoan = ?`,
      [mataikhoan]
    );
    return rows.map(row => new GioHang(row));
  },

  // Xoá sản phẩm khỏi giỏ hàng
  async delete(magiohang) {
    const [result] = await pool.query(
      `DELETE FROM giohang WHERE magiohang = ?`,
      [magiohang]
    );
    return result.affectedRows > 0;
  },

  // Cập nhật số lượng sản phẩm trong giỏ
  async updateQuantity(magiohang, soluong) {
    const sql = `UPDATE giohang SET soluong = ? WHERE magiohang = ?`;
    await pool.query(sql, [soluong, magiohang]);
    const [rows] = await pool.query(`SELECT * FROM giohang WHERE magiohang = ?`, [magiohang]);
    return rows.length > 0 ? new GioHang(rows[0]) : null;
  }
};

module.exports = GioHangRepository;
