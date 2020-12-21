const express = require("express");
const router = express.Router();
const onAuthStateChanged = require("../models/user").onAuthStateChanged;
const validator = require("../utils/validator");
const word = require("../models/word");

router.get("/add", (req, res) => {
  res.render("addWord");
});

router.post("/add", (req, res) => {
  const { contextWord, ...answers } = req.body;
  let validationErrors = validator.addWord(req);

  if (validationErrors) {
    res.render("addWord", { errors: validationErrors });
  } else {
    // TODO: Store word in Firestore
    try {
    } catch (error) {}
  }
});

router.get("/guess-words", (req, res) => {
  res.render("guessTheWords");
});

module.exports = router;
