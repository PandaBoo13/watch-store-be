const pool = require('../db/mysql').promise(); // pool với promise API
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userRepository = {
async findByEmail(email) {
  const sql = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows.length > 0 ? rows[0] : null;
}
,

 async createAccount({ email, password, fullname, phone, address, role = 'customer' }) {
  const accountid = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  const connection = await pool.getConnection(); // lấy connection

  try {
    await connection.beginTransaction();

    const insertAccount = 'INSERT INTO account (accountid, password, role) VALUES (?, ?, ?)';
    await connection.query(insertAccount, [accountid, hashedPassword, role]);

    const insertUser = 'INSERT INTO user (userid, email, fullname, phonenumber, address) VALUES (?, ?, ?, ?, ?)';
    await connection.query(insertUser, [accountid, email, fullname, phone, address]);

    await connection.commit();
    console.log('✅ User and account created successfully.');
    return { accountid, email, fullname, phone, address, role };
  } catch (err) {
    await connection.rollback();
    console.error('❌ Transaction failed:', err);
    throw err;
  } finally {
    connection.release();
  }
}

};

module.exports = userRepository;
