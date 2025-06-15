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
// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // => /api/users/register
app.use("/api/watchs", watchRoutes);
app.use("/api/sanphams", sanphamRoutes);
app.use("/api/danhmucs", danhmucRoutes);

// Error handler (tuỳ chọn)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, host, () => {
  console.log(`app listen on port ${PORT}`);
});
