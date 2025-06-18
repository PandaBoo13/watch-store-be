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
    items = [], // 👈 FE truyền vào các sản phẩm được chọn
  }) {
    const madonhang = await this.generateUniqueDonHangId(mataikhoan);
    const ngaydat = new Date();

    // 1. Tạo đơn hàng
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

    // 2. Tạo chi tiết đơn hàng từ giỏ hàng
    await ChiTietDonHangRepository.chuyenGioHangSangChiTietDonHang(
      mataikhoan,
      madonhang,
      items // 👈 danh sách sản phẩm FE gửi lên
    );

    // 3. Trả về đơn hàng mới
    return await this.findById(madonhang);
  }
,

  // Sinh mã đơn hàng không trùng
 async generateUniqueDonHangId(mataikhoan) {
  const likePattern = `DH_${mataikhoan}_%`;

  const [rows] = await pool.query(
    `SELECT madonhang FROM donhang WHERE mataikhoan = ? AND madonhang LIKE ?`,
    [mataikhoan, likePattern]
  );

  let max = 0;
  for (const row of rows) {
    const parts = row.madonhang.split('_');
    const so = parseInt(parts[2]);
    if (!isNaN(so) && so > max) {
      max = so;
    }
  }

  const next = (max + 1).toString().padStart(3, '0');
  return `DH_${mataikhoan}_${next}`;
}
,
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
