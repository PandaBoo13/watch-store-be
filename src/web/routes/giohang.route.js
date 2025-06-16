const express = require("express");
const router = express.Router();
const GioHangController = require("../controllers/GioHangController");

router.post("/add", GioHangController.add);
router.get("/user/:mataikhoan", GioHangController.getByTaiKhoan);
router.delete("/delete/:id", GioHangController.delete);
router.put("/update/:id", GioHangController.updateQuantity);

module.exports = router;
