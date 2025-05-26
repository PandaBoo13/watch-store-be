require('dotenv').config();
console.log('PORT from env:', process.env.PORT);  // thêm dòng này để debug
const express = require('express');
const app = express();

const PORT = process.env.PORT;
const host = process.env.HOST_NAME;

const userRoutes = require("./web/routes/user.route");


// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // => /api/users/register

// Error handler (tuỳ chọn)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, host, () => {
  console.log(`app listen on port ${PORT}`);
});
