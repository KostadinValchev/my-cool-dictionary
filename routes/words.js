const express = require("express");
const router = express.Router();
const validator = require("../utils/validator");
const {
  addWordDocument,
  getAllWordsFromDatabase,
  updateWordData,
  setNewScoreResultFromUser,
} = require("../models/word");
const { json } = require("body-parser");

router.get("/add", (req, res) => {
  res.render("words/addWord");
});

router.post("/add", async (req, res) => {
  const { contextWord, ...answers } = req.body;
  let validationErrors = validator.addWord(req);

  if (validationErrors) {
    res.render("words/addWord", { errors: validationErrors });
  } else {
    try {
      await addWordDocument(req.session.user.uid, {
        contextWord,
        answers,
      });
      req.flash("success_msg", "Successfully added word");
      res.redirect("/words/add");
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/guess-words", async (req, res) => {
  try {
    let words = await getAllWordsFromDatabase(req.session.user.uid);
    res.render("words/guessTheWords", { words });
  } catch (error) {
    console.log(error);
  }
});

router.post("/finish-competition", async (req, res) => {
  let { score, data } = req.body;
  let userId = req.session.user.uid;
  if (!score || !data || !userId) {
    return res.status(400).send("Invalid data");
  } else {
    try {
      await setNewScoreResultFromUser(userId, score);
      await updateWordData(userId, data);
      res.status(200).send("Successfully");
      res.end();
    } catch (error) {
      console.log("Errror", error);
    }
  }
});

module.exports = router;
