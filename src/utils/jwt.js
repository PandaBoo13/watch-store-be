const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // 🔐 Đổi thành giá trị thực tế, lưu trong biến môi trường

const authService = {
  taoToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' }); // Token hết hạn sau 1 ngày
  },

  xacThucToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return null;
    }
  }
  
};

module.exports = authService;
