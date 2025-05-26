const UserRepository = require("../infras/repositories/UserRepository");

const UserService = {
  async register(data) {
    const { email, password, fullname, phone, address } = data;

    // Kiểm tra email đã tồn tại chưa
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      throw new Error("Email already exists");
    }

    // Gọi hàm tạo account (có dùng UUID và mã hóa mật khẩu bên trong)
    await UserRepository.createAccount({ email, password, fullname, phone, address });

    return { message: "User registered successfully" };
  }
};

module.exports = UserService;
