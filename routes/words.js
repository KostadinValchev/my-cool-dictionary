const express = require("express");
const router = express.Router();
const onAuthStateChanged = require("../models/user").onAuthStateChanged;

router.get("/add", (req, res) => {
  res.render("addWord");
});

router.get("/guess-words", (req, res) => {
  res.render("guessTheWords");
});

module.exports = router;
