const express = require("express");
const router = express.Router();

const WatchController = require("../controllers/WatchController");

router.post("/create", WatchController.create);

module.exports = router;