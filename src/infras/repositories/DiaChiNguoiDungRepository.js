const pool = require("../db/mysql").promise();

class DiaChiNguoiDung {
  constructor(data) {
    Object.assign(this, data);
  }
}

const DiaChiNguoiDungRepository = {

  async findDefaultByTaiKhoan(mataikhoan) {
  const [rows] = await pool.query(
    "SELECT * FROM diachinguoidung WHERE mataikhoan = ? AND la_mac_dinh = true LIMIT 1",
    [mataikhoan]
  );
  return rows.length > 0 ? new DiaChiNguoiDung(rows[0]) : null;
},
  // Tạo địa chỉ người dùng mới
  async createDiaChi({
    mataikhoan,
    tennguoinhan,
    sodienthoai,
    diachi,
    la_mac_dinh = false
  }) {
    const madiachi = await this.generateUniqueId(mataikhoan);

    // Nếu là địa chỉ mặc định, cập nhật tất cả các địa chỉ trước đó thành không mặc định
    if (la_mac_dinh) {
      await pool.query(
        "UPDATE diachinguoidung SET la_mac_dinh = false WHERE mataikhoan = ?",
        [mataikhoan]
      );
    }

    const sql = `
      INSERT INTO diachinguoidung (
        madiachi, mataikhoan, tennguoinhan, sodienthoai, diachi, la_mac_dinh
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      madiachi,
      mataikhoan,
      tennguoinhan,
      sodienthoai,
      diachi,
      la_mac_dinh
    ]);

    return await this.findById(madiachi);
  },

  // Sinh mã địa chỉ không trùng
async generateUniqueId(mataikhoan) {
  const likePattern = `DC_${mataikhoan}_%`;

  const [rows] = await pool.query(
    `SELECT madiachi FROM diachinguoidung WHERE mataikhoan = ? AND madiachi LIKE ?`,
    [mataikhoan, likePattern]
  );

  let max = 0;
  for (const row of rows) {
    const parts = row.madiachi.split('_');
    const so = parseInt(parts[2]);
    if (!isNaN(so) && so > max) {
      max = so;
    }
  }

  const next = (max + 1).toString().padStart(3, '0');
  return `DC_${mataikhoan}_${next}`;
}
,

  // Lấy địa chỉ theo ID
  async findById(madiachi) {
    const [rows] = await pool.query(
      "SELECT * FROM diachinguoidung WHERE madiachi = ?",
      [madiachi]
    );
    return rows.length > 0 ? new DiaChiNguoiDung(rows[0]) : null;
  },

  // Lấy tất cả địa chỉ của một tài khoản
  async findByTaiKhoan(mataikhoan) {
    const [rows] = await pool.query(
      "SELECT * FROM diachinguoidung WHERE mataikhoan = ?",
      [mataikhoan]
    );
    return rows.map(row => new DiaChiNguoiDung(row));
  },

  // Cập nhật địa chỉ
  async updateDiaChi(madiachi, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const sql = `UPDATE diachinguoidung SET ${setClause} WHERE madiachi = ?`;

    await pool.query(sql, [...values, madiachi]);
    return await this.findById(madiachi);
  },

  // Xóa địa chỉ
  async deleteDiaChi(madiachi) {
    const [result] = await pool.query(
      "DELETE FROM diachinguoidung WHERE madiachi = ?",
      [madiachi]
    );
    return result.affectedRows > 0;
  },


    async createDiaChiMacDinh({
    mataikhoan,
    tennguoinhan,
    sodienthoai,
    diachi
  }) {
    // Cập nhật tất cả địa chỉ trước đó thành không mặc định
    await pool.query(
      "UPDATE diachinguoidung SET la_mac_dinh = false WHERE mataikhoan = ?",
      [mataikhoan]
    );

    // Tạo mã địa chỉ mới
    const madiachi = await this.generateUniqueId(mataikhoan);

    // Chèn địa chỉ mới với la_mac_dinh = true
    const sql = `
      INSERT INTO diachinguoidung (
        madiachi, mataikhoan, tennguoinhan, sodienthoai, diachi, la_mac_dinh
      ) VALUES (?, ?, ?, ?, ?, true)
    `;

    await pool.query(sql, [
      madiachi,
      mataikhoan,
      tennguoinhan,
      sodienthoai,
      diachi
    ]);

    return await this.findById(madiachi);
  },
};

module.exports = DiaChiNguoiDungRepository;
