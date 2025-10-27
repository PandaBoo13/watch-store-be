const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';

const authService = {
  taoToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' }); 
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
