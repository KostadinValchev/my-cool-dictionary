const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.render("addWord");
});

router.get("/guess-words", (req, res) => {
  res.render("guessTheWords");
});

module.exports = router;
