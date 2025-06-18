const pool = require("../db/mysql").promise();
const { v4: uuidv4 } = require('uuid');

class ChiTietDonHang {
  constructor(data) {
    Object.assign(this, data);
  }
}

const ChiTietDonHangRepository = {

  
  // Tạo chi tiết đơn hàng mới
async createChiTiet({ madonhang, masanpham, soluong, giaban }) {
  const machitietdonhang = `CT_${uuidv4()}`; // dùng uuid thay vì sinh tăng dần

  const sql = `
    INSERT INTO chitietdonhang (
      machitietdonhang, madonhang, masanpham, soluong, giaban
    ) VALUES (?, ?, ?, ?, ?)
  `;

  await pool.query(sql, [
    machitietdonhang,
    madonhang,
    masanpham,
    soluong,
    giaban
  ]);

  return await this.findById(machitietdonhang);
}
,

async chuyenGioHangSangChiTietDonHang(mataikhoan, madonhang, selectedItems) {
  for (const item of selectedItems) {
    const { masanpham, soluong } = item;

    // Kiểm tra sản phẩm có trong giỏ hàng hay không (bảo vệ dữ liệu)
    const [checkRows] = await pool.query(
      "SELECT * FROM giohang WHERE mataikhoan = ? AND masanpham = ?",
      [mataikhoan, masanpham]
    );
    if (checkRows.length === 0) continue; // bỏ qua nếu không có

    // Lấy giá bán sản phẩm hiện tại
    const [spRows] = await pool.query(
      "SELECT giaban FROM sanpham WHERE masanpham = ?",
      [masanpham]
    );
    const giaban = spRows[0]?.giaban || 0;

    // Tạo chi tiết đơn hàng
    await ChiTietDonHangRepository.createChiTiet({
      madonhang,
      masanpham,
      soluong,
      giaban,
    });

    // Xóa sản phẩm đó khỏi giỏ hàng
    await pool.query(
      "DELETE FROM giohang WHERE mataikhoan = ? AND masanpham = ?",
      [mataikhoan, masanpham]
    );
  }
}
,
  // Sinh mã chi tiết không trùng
  async generateUniqueId(madonhang) {
  const likePattern = `CT_${madonhang}_%`;

  const [rows] = await pool.query(
    `SELECT machitietdonhang FROM chitietdonhang WHERE madonhang = ? AND machitietdonhang LIKE ?`,
    [madonhang, likePattern]
  );

  let max = 0;
  for (const row of rows) {
    const parts = row.machitietdonhang.split('_');
    const so = parseInt(parts[2]);
    if (!isNaN(so) && so > max) {
      max = so;
    }
  }

  const next = (max + 1).toString().padStart(3, '0');
  return `CT_${madonhang}_${next}`;
}
,
  // Lấy chi tiết theo mã
  async findById(machitietdonhang) {
    const [rows] = await pool.query(
      "SELECT * FROM chitietdonhang WHERE machitietdonhang = ?",
      [machitietdonhang]
    );
    return rows.length > 0 ? new ChiTietDonHang(rows[0]) : null;
  },

  // Lấy tất cả chi tiết của 1 đơn hàng
  async findByDonHangId(madonhang) {
    const [rows] = await pool.query(
      `
      SELECT 
        ct.*, sp.tensanpham, sp.hinhanhchinh
      FROM chitietdonhang ct
      JOIN sanpham sp ON ct.masanpham = sp.masanpham
      WHERE ct.madonhang = ?
      `,
      [madonhang]
    );
    return rows.map((row) => new ChiTietDonHang(row));
  },

  // Lấy toàn bộ chi tiết đơn hàng
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM chitietdonhang");
    return rows.map((row) => new ChiTietDonHang(row));
  },

  // Cập nhật chi tiết đơn hàng
  async update(machitietdonhang, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const sql = `UPDATE chitietdonhang SET ${setClause} WHERE machitietdonhang = ?`;

    await pool.query(sql, [...values, machitietdonhang]);
    return await this.findById(machitietdonhang);
  },

  // Xóa chi tiết đơn hàng
  async delete(machitietdonhang) {
    const [result] = await pool.query(
      "DELETE FROM chitietdonhang WHERE machitietdonhang = ?",
      [machitietdonhang]
    );
    return result.affectedRows > 0;
  },
};

module.exports = ChiTietDonHangRepository;
