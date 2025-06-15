const pool = require('../db/mysql').promise();

class SanPham {
  constructor(data) {
    Object.assign(this, data);
  }
}

const SanPhamRepository = {
  // Tạo sản phẩm mới
  async createSanPham({
    tensanpham,
    mamodel,
    mota,
    giaban,
    hinhanhchinh,
    mauudai,
    soluong,
    bestseller,
    trangthai = 'dangban' // mặc định nếu không truyền
  }) {
    const masanpham = await this.generateUniqueSanPhamId();
    const ngaytao = new Date();

    const sql = `
      INSERT INTO sanpham (
        masanpham, tensanpham, mamodel, mota, giaban, hinhanhchinh,
        ngaytao, mauudai, soluong, bestseller, trangthai
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      masanpham, tensanpham, mamodel, mota, giaban, hinhanhchinh,
      ngaytao, mauudai, soluong, bestseller, trangthai
    ]);

    return await this.findById(masanpham);
  },

  // Sinh mã sản phẩm không trùng
  async generateUniqueSanPhamId() {
    let id;
    let exists = true;

    while (exists) {
      id = Math.floor(100000 + Math.random() * 900000);
      const [rows] = await pool.query(
        'SELECT 1 FROM sanpham WHERE masanpham = ?',
        [id]
      );
      exists = rows.length > 0;
    }

    return id.toString();
  },

  // Tìm theo mã
  async findById(masanpham) {
    const [rows] = await pool.query(
      'SELECT * FROM sanpham WHERE masanpham = ?',
      [masanpham]
    );
    return rows.length > 0 ? new SanPham(rows[0]) : null;
  },

  // Lấy tất cả sản phẩm
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM sanpham');
    return rows.map(row => new SanPham(row));
  },

  // Cập nhật sản phẩm
  async updateSanPham(masanpham, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE sanpham SET ${setClause} WHERE masanpham = ?`;

    await pool.query(sql, [...values, masanpham]);
    return await this.findById(masanpham);
  },

  // Xóa sản phẩm
  async deleteSanPham(masanpham) {
    const [result] = await pool.query(
      'DELETE FROM sanpham WHERE masanpham = ?',
      [masanpham]
    );
    return result.affectedRows > 0;
  }
};

module.exports = SanPhamRepository;
