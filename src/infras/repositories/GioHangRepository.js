const pool = require('../db/mysql').promise();

class GioHang {
  constructor(data) {
    Object.assign(this, data);
  }
}

const GioHangRepository = {
  // Sinh mã giỏ hàng ngẫu nhiên không trùng
  // Sinh mã giỏ hàng theo dạng GH_<mataikhoan>_<số tăng dần>
  async generateUniqueGioHangId(mataikhoan) {
    const likePattern = `GH_${mataikhoan}_%`;

    const [rows] = await pool.query(
      `SELECT magiohang FROM giohang WHERE mataikhoan = ? AND magiohang LIKE ?`,
      [mataikhoan, likePattern]
    );

    let max = 0;
    for (const row of rows) {
      const parts = row.magiohang.split('_');
      const so = parseInt(parts[2]);
      if (!isNaN(so) && so > max) {
        max = so;
      }
    }

    const next = (max + 1).toString().padStart(3, '0');
    return `GH_${mataikhoan}_${next}`;
  },


  // Thêm sản phẩm vào giỏ
  async add({ mataikhoan, masanpham, soluong }) {
  const ngaythem = new Date();

  // 1. Kiểm tra sản phẩm đã có trong giỏ hàng chưa
  const [rows] = await pool.query(
    `SELECT * FROM giohang WHERE mataikhoan = ? AND masanpham = ?`,
    [mataikhoan, masanpham]
  );

  if (rows.length > 0) {
    // 2. Nếu đã có, cập nhật số lượng (cộng thêm)
    const currentSoLuong = rows[0].soluong;
    const newSoLuong = currentSoLuong + soluong;

    await pool.query(
      `UPDATE giohang SET soluong = ?, ngaythem = ? WHERE magiohang = ?`,
      [newSoLuong, ngaythem, rows[0].magiohang]
    );

    return {
      magiohang: rows[0].magiohang,
      mataikhoan,
      masanpham,
      soluong: newSoLuong,
      ngaythem
    };
  } else {
    // 3. Nếu chưa có, tạo mới
    const magiohang = await this.generateUniqueGioHangId(mataikhoan);

    await pool.query(
      `INSERT INTO giohang (magiohang, mataikhoan, masanpham, soluong, ngaythem)
       VALUES (?, ?, ?, ?, ?)`,
      [magiohang, mataikhoan, masanpham, soluong, ngaythem]
    );

    return {
      magiohang,
      mataikhoan,
      masanpham,
      soluong,
      ngaythem
    };
  }
}
,
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
