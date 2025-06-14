// models/User.js

class User {
  constructor(userid, email, fullname, phonenumber, address) {
    this.userid = userid;
    this.email = email;
    this.fullname = fullname;
    this.phonenumber = phonenumber;
    this.address = address;
  }

  // Ví dụ: Phương thức để in thông tin người dùng
  getInfo() {
    return `${this.fullname} (${this.userid}) - ${this.email}`;
  }
}

module.exports = User;
