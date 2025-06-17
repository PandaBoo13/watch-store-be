const pool = require("../db/mysql").promise();

class DonHang {
  constructor(data) {
    Object.assign(this, data);
  }
}

const DonHangRepository = {
  // Tạo đơn hàng
  async createDonHang({
    mataikhoan,
    madiachi,
    tongtien,
    trangthai = 'chua_thanh_toan',
    maphuongthuc,
    madonvivanchuyen,
  }) {
    const madonhang = await this.generateUniqueDonHangId();
    const ngaydat = new Date();

    const sql = `
      INSERT INTO donhang (
        madonhang, mataikhoan, madiachi, tongtien, trangthai, maphuongthuc, madonvivanchuyen, ngaydat
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      madonhang,
      mataikhoan,
      madiachi,
      tongtien,
      trangthai,
      maphuongthuc,
      madonvivanchuyen,
      ngaydat,
    ]);

    return await this.findById(madonhang);
  },

  // Sinh mã đơn hàng không trùng
  async generateUniqueDonHangId() {
    let id;
    let exists = true;

    while (exists) {
      id = 'DH' + Math.floor(100000 + Math.random() * 900000);
      const [rows] = await pool.query(
        "SELECT 1 FROM donhang WHERE madonhang = ?",
        [id]
      );
      exists = rows.length > 0;
    }

    return id;
  },

  // Lấy tất cả đơn hàng (có thể filter theo tài khoản, trạng thái,...)
  async findAllWithFilter(filter = {}) {
    let sql = "SELECT * FROM donhang";
    const conditions = [];
    const values = [];

    for (const [key, value] of Object.entries(filter)) {
      conditions.push(`${key} = ?`);
      values.push(value);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await pool.query(sql, values);
    return rows.map((row) => new DonHang(row));
  },


  async findAll() {
  const [rows] = await pool.query("SELECT * FROM donhang");
  return rows.map((row) => new DonHang(row));
},


  // Lấy đơn hàng theo mã
  async findById(madonhang) {
    const [rows] = await pool.query(
      "SELECT * FROM donhang WHERE madonhang = ?",
      [madonhang]
    );
    return rows.length > 0 ? new DonHang(rows[0]) : null;
  },

  // Cập nhật trạng thái đơn hàng
  async updateTrangThai(madonhang, trangthai) {
    const sql = "UPDATE donhang SET trangthai = ? WHERE madonhang = ?";
    await pool.query(sql, [trangthai, madonhang]);
    return await this.findById(madonhang);
  },

  // Xoá đơn hàng
  async deleteDonHang(madonhang) {
    const [result] = await pool.query(
      "DELETE FROM donhang WHERE madonhang = ?",
      [madonhang]
    );
    return result.affectedRows > 0;
  },



};

module.exports = DonHangRepository;
