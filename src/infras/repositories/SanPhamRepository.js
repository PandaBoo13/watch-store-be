const pool = require("../db/mysql").promise();

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
    trangthai = "dangban", // mặc định nếu không truyền
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
      masanpham,
      tensanpham,
      mamodel,
      mota,
      giaban,
      hinhanhchinh,
      ngaytao,
      mauudai||null,
      soluong,
      bestseller,
      trangthai,
    ]);

    return await this.findById(masanpham);
  },
  async findAllWithFilter(filter = {}) {
    let sql = "SELECT * FROM sanpham";
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
    return rows.map((row) => new SanPham(row));
  },

  // Sinh mã sản phẩm không trùng
async generateUniqueSanPhamId() {
  const [rows] = await pool.query(`
    SELECT masanpham FROM sanpham 
    WHERE masanpham LIKE 'SP%' 
    ORDER BY masanpham DESC 
    LIMIT 1
  `);

  let newNumber = 1;

  if (rows.length > 0) {
    const lastId = rows[0].masanpham; // VD: 'SP000123'
    const numberPart = parseInt(lastId.substring(2), 10); // bỏ 'SP'
    newNumber = numberPart + 1;
  }

  const newId = "SP" + String(newNumber).padStart(6, "0"); // VD: 'SP000124'
  return newId;
}
,

  // Tìm theo mã
  async findById(masanpham) {
    const [rows] = await pool.query(
      "SELECT * FROM sanpham WHERE masanpham = ?",
      [masanpham]
    );
    return rows.length > 0 ? new SanPham(rows[0]) : null;
  },

  // Lấy tất cả sản phẩm
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM sanpham");
    return rows.map((row) => new SanPham(row));
  },

  // Cập nhật sản phẩm
  async updateSanPham(masanpham, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const sql = `UPDATE sanpham SET ${setClause} WHERE masanpham = ?`;

    await pool.query(sql, [...values, masanpham]);
    return await this.findById(masanpham);
  },

  // Xóa sản phẩm
  async deleteSanPham(masanpham) {
    const [result] = await pool.query(
      "DELETE FROM sanpham WHERE masanpham = ?",
      [masanpham]
    );
    return result.affectedRows > 0;
  },

  // Lấy chi tiết sản phẩm + thông tin đồng hồ
  async findDetailByMaSanPham(masanpham) {
    const [rows] = await pool.query(
      `
    SELECT 
      sp.*, 
      dh.tenmodel, dh.madanhmuc, dh.chatlieuvo, dh.chatlieuday,
      dh.mauday, dh.duongkinh, dh.doday, dh.chongnuoc,
      dh.dongco, dh.mausomatso, dh.gioitinh
    FROM sanpham sp
    JOIN dongho dh ON sp.mamodel = dh.madongho
    WHERE sp.masanpham = ?
    `,
      [masanpham]
    );
    return rows.length > 0 ? rows[0] : null;
  },
  async laySanPhamBestseller() {
    const [rows] = await pool.query(
      "SELECT * FROM sanpham WHERE bestseller = 1"
    );
    return rows;
  },
  async layDongHoNam() {
    const [rows] = await pool.query(`
      SELECT sp.*
      FROM sanpham sp
      JOIN dongho dh ON sp.mamodel = dh.madongho
      WHERE dh.gioitinh = 'nam'
    `);
    return rows.map((row) => new SanPham(row));
  },
  async layDongHoNu() {
    const [rows] = await pool.query(`
      SELECT sp.*
      FROM sanpham sp
      JOIN dongho dh ON sp.mamodel = dh.madongho
      WHERE dh.gioitinh = 'nu'
    `);
    return rows.map((row) => new SanPham(row));
  },

async layGiaSanPham(masanpham) {
  const [rows] = await pool.query(
    "SELECT giaban, tensanpham FROM sanpham WHERE masanpham = ?",
    [masanpham]
  );
  if (rows.length > 0) {
    return {
      giaban: rows[0].giaban,
      tensanpham: rows[0].tensanpham,
    };
  } else {
    return null;
  }
}


};
module.exports = SanPhamRepository;
