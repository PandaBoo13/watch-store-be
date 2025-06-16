const express = require("express");
const router = express.Router();

const UuDaiController = require("../controllers/UuDaiController");

// Tạo ưu đãi mới
router.post("/create", UuDaiController.create);

// Xóa ưu đãi theo mã
router.delete("/delete/:id", UuDaiController.delete);

// Lấy tất cả ưu đãi
router.get("/", UuDaiController.getAll);

// Lấy ưu đãi theo mã
router.get("/getId/:id", UuDaiController.getById);

// Cập nhật ưu đãi
router.put("/update/:id", UuDaiController.update);

module.exports = router;
