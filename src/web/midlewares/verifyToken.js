const authService = require('../../utils/jwt');

function optionalVerifyToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1]; // Format: "Bearer token"

  if (token) {
    const user = authService.xacThucToken(token);
    if (user) {
      req.user = user; // 👉 chỉ gán nếu hợp lệ
    }
    // Nếu token sai, không làm gì, cũng không chặn
  }

  next(); // ✅ luôn gọi tiếp, không chặn
}

module.exports = optionalVerifyToken;
