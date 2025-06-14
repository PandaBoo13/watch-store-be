const pool = require('../db/mysql').promise();

// Hàm tạo mã 6 chữ số không trùng
async function generateUniqueProductId() {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(100000 + Math.random() * 900000); // Số ngẫu nhiên từ 100000 đến 999999
    const [rows] = await pool.query('SELECT 1 FROM watch WHERE productid = ?', [id]);
    exists = rows.length > 0;
  }

  return id.toString(); // Trả về dưới dạng chuỗi nếu productid là VARCHAR
}

// Watch entity constructor
class Watch {
  constructor(data) {
    Object.assign(this, data);
  }
}

const WatchRepository = {
  // Tạo sản phẩm đồng hồ mới
  async createWatch({
    nameid,
    categoryid,
    casematerial,
    strapmaterial,
    strapcolor,
    diameter,
    thickness,
    waterresistance,
    movementtype,
    dialcolor,
    quantity,
  }) {
    const productid = await generateUniqueProductId();

    const sql = `
      INSERT INTO watch (
        productid, nameid, categoryid, casematerial, strapmaterial,
        strapcolor, diameter, thickness, waterresistance,
        movementtype, dialcolor, quantity
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      productid, nameid, categoryid, casematerial, strapmaterial,
      strapcolor, diameter, thickness, waterresistance,
      movementtype, dialcolor, quantity
    ]);

    return await this.findById(productid);
  },

  // Tìm đồng hồ theo productid
  async findById(productid) {
    const [rows] = await pool.query('SELECT * FROM watch WHERE productid = ?', [productid]);
    return rows.length > 0 ? new Watch(rows[0]) : null;
  },

  // Lấy tất cả sản phẩm
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM watch');
    return rows.map(row => new Watch(row));
  },

  // Cập nhật thông tin đồng hồ
  async updateWatch(productid, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE watch SET ${setClause} WHERE productid = ?`;

    await pool.query(sql, [...values, productid]);
    return await this.findById(productid);
  },

  // Xóa sản phẩm theo ID
  async deleteWatch(productid) {
    const sql = 'DELETE FROM watch WHERE productid = ?';
    const [result] = await pool.query(sql, [productid]);
    return result.affectedRows > 0;
  }
};

module.exports = WatchRepository;
