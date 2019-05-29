const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// @route   POST api/user/auth
// @desc    Login User
// @access  Public
router.post("/auth", userController.login);

// @route   POST api/user/register
// @desc    Register User
// @access  Public
router.post("/register", userController.register);

module.exports = router;
