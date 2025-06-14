const pool = require('../db/mysql').promise();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const NguoiDungRepository = {
  async timBangEmail(email) {
    const sql = 'SELECT * FROM nguoidung WHERE email = ?';
    const [dong] = await pool.query(sql, [email]);
    return dong.length > 0 ? dong[0] : null;
  },

  async timNguoiDungVaMatKhau(email) {
    const sql = `
      SELECT t.mataikhoan, t.matkhau, t.vaitro, n.hoten
      FROM taikhoan t
      JOIN nguoidung n ON t.mataikhoan = n.manguoidung
      WHERE n.email = ?
    `;
    const [dong] = await pool.query(sql, [email]);
    return dong.length > 0 ? dong[0] : null;
  },

  async taoTaiKhoan({ email, matkhau, vaitro = 'customer' }) {
    const mataikhoan = uuidv4();
    const matkhauMaHoa = await bcrypt.hash(matkhau, 10);

    const ketNoi = await pool.getConnection();
    try {
      await ketNoi.beginTransaction();

      const lenhTaiKhoan = 'INSERT INTO taikhoan (mataikhoan, matkhau, vaitro) VALUES (?, ?, ?)';
      await ketNoi.query(lenhTaiKhoan, [mataikhoan, matkhauMaHoa, vaitro]);

      const lenhNguoiDung = 'INSERT INTO nguoidung (manguoidung, email) VALUES (?, ?)';
      await ketNoi.query(lenhNguoiDung, [mataikhoan, email]);

      await ketNoi.commit();
      console.log('✅ Tạo tài khoản và người dùng thành công.');
      return { mataikhoan, email, vaitro };
    } catch (loi) {
      await ketNoi.rollback();
      console.error('❌ Giao dịch thất bại:', loi);
      throw loi;
    } finally {
      ketNoi.release();
    }
  }
};

module.exports = NguoiDungRepository;
