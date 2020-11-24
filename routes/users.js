const express = require("express");
const router = express.Router();

// Register User
router.get("/register", (req, res) => {
  res.render("register");
});

// Login User
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
