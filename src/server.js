require('dotenv').config();
console.log('PORT from env:', process.env.PORT);  // thêm dòng này để debug
const express = require('express');
const app = express();
const cors= require('./utils/config/cors.config')


const PORT = process.env.PORT;
const host = process.env.HOST_NAME;

app.use(cors);


const userRoutes = require("./web/routes/nguoiDung.route");
const watchRoutes= require("./web/routes/dongho.route");
const sanphamRoutes= require('./web/routes/sanpham.route');
const danhmucRoutes= require('./web/routes/danhmucdongho.route');
const khohangRoutes = require("./web/routes/khohang.route");
const gioHangRoutes = require("./web/routes/giohang.route");
const uudaiRoutes= require("./web/routes/uudai.route");
const diachinguoidungRoutes= require("./web/routes/diachinguoidung.route");
const phuongthucthanhtoanRoutes= require("./web/routes/phuongthucthanhtoan.routes");
const donhangRoutes= require("./web/routes/donhang.routes");
const chitietdonhangRoutes= require("./web/routes/chitietdonhang.route");
const nguoidungRoutes= require("./web/routes/nguoiDung.route");
// Middleware
app.use(express.json());


// Routes
app.use("/api/users", userRoutes); // => /api/users/register
app.use("/api/nguoidungs", nguoidungRoutes);
app.use("/api/watchs", watchRoutes);
app.use("/api/sanphams", sanphamRoutes);
app.use("/api/danhmucs", danhmucRoutes);
app.use("/api/khohang", khohangRoutes);  
app.use("/api/giohangs", gioHangRoutes);  
app.use("/api/uudais", uudaiRoutes);  
app.use("/api/diachinguoidungs", diachinguoidungRoutes);  
app.use("/api/phuongthucs", phuongthucthanhtoanRoutes);  
app.use("/api/donhangs", donhangRoutes);  
app.use("/api/chitiets", chitietdonhangRoutes);  
// Error handler (tuỳ chọn)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, host, () => {
  console.log(`app listen on port ${PORT}`);
});
