const express = require("express");

const userController = require("../controllers/userController")

const router = express.Router();

// /register => POST
router.post("/register", userController.postRegister);

// /login => POST
router.post("/login", userController.postLogin);

// /upload => POST
router.post("/upload", userController.postUploadCsv);

// /transfer => POST
router.post("/transfer", userController.postAccountTransfer);

module.exports = router;
