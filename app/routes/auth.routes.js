const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Cong dang ky
router.post("/register", authController.register);
//Cong dang nhap
router.post("/login", authController.login);
module.exports = router;
