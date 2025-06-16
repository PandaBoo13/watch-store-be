const pool = require('../db/mysql').promise();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const NguoiDungRepository = {
  // Tìm người dùng theo email
  async timBangEmail(email) {
    const sql = 'SELECT * FROM nguoidung WHERE email = ?';
    const [rows] = await pool.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Tìm người dùng kèm mật khẩu để đăng nhập
  async timNguoiDungVaMatKhau(email) {
    const sql = `
      SELECT t.mataikhoan, t.matkhau, t.vaitro, n.hoten
      FROM taikhoan t
      JOIN nguoidung n ON t.mataikhoan = n.manguoidung
      WHERE n.email = ?
    `;
    const [rows] = await pool.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Lấy tất cả người dùng
async layTatCaNguoiDung() {
  const sql = `
    SELECT 
      n.manguoidung, n.email, n.hoten, n.sodienthoai, 
      t.vaitro
    FROM nguoidung n
    JOIN taikhoan t ON n.manguoidung = t.mataikhoan
    ORDER BY n.hoten
  `;
  const [rows] = await pool.query(sql);
  return rows;
},


  // Tạo tài khoản + thông tin người dùng
  async taoTaiKhoan({ email, matkhau, vaitro = 'customer', hoten = '', sodienthoai = '' }) {
    const mataikhoan = uuidv4();
    const matkhauMaHoa = await bcrypt.hash(matkhau, 10);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Thêm vào bảng taikhoan
      await conn.query(
        'INSERT INTO taikhoan (mataikhoan, matkhau, vaitro) VALUES (?, ?, ?)',
        [mataikhoan, matkhauMaHoa, vaitro]
      );

      // Thêm vào bảng nguoidung
      await conn.query(
        'INSERT INTO nguoidung (manguoidung, email, hoten, sodienthoai) VALUES (?, ?, ?, ?)',
        [mataikhoan, email, hoten, sodienthoai]
      );

      await conn.commit();
      return { mataikhoan, email, hoten, vaitro };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  // Lấy thông tin người dùng theo ID
  async layNguoiDungTheoId(manguoidung) {
    const sql = 'SELECT * FROM nguoidung WHERE manguoidung = ?';
    const [rows] = await pool.query(sql, [manguoidung]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Cập nhật thông tin người dùng
  async capNhatThongTin(manguoidung, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const sql = `UPDATE nguoidung SET ${setClause} WHERE manguoidung = ?`;

    const [result] = await pool.query(sql, [...values, manguoidung]);
    return result.affectedRows > 0;
  },

  // Đổi mật khẩu
  async doiMatKhau(mataikhoan, matkhauMoi) {
    const matkhauHash = await bcrypt.hash(matkhauMoi, 10);
    const sql = 'UPDATE taikhoan SET matkhau = ? WHERE mataikhoan = ?';
    const [result] = await pool.query(sql, [matkhauHash, mataikhoan]);
    return result.affectedRows > 0;
  },

  // Xóa người dùng và tài khoản
  async xoaNguoiDung(mataikhoan) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      await conn.query('DELETE FROM nguoidung WHERE manguoidung = ?', [mataikhoan]);
      await conn.query('DELETE FROM taikhoan WHERE mataikhoan = ?', [mataikhoan]);

      await conn.commit();
      return true;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
};

module.exports = NguoiDungRepository;
