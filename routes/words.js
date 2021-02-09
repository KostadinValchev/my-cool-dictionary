const express = require("express");
const router = express.Router();
const validator = require("../utils/validator");
const {
  addWordDocument,
  getAllWordsFromDatabase,
  updateWordData,
  setNewScoreResultFromUser,
  getNextPage,
  getPrevPage,
} = require("../models/word");
const {
  redirectLogin,
  increaseUserTotalWordsCounter,
  increaseUserCountersAftCompetition,
} = require("../models/user");

router.get("/add", redirectLogin, (req, res) => {
  res.render("words/addWord");
});

router.post("/add", async (req, res) => {
  const { contextWord, ...answers } = req.body;
  let validationErrors = validator.addWord(req);
  let userId = req.session.user.uid;
  if (validationErrors) {
    res.render("words/addWord", { errors: validationErrors });
  } else {
    try {
      await addWordDocument(userId, {
        contextWord,
        answers,
      });
      await increaseUserTotalWordsCounter(userId);
      req.flash("success_msg", "Successfully added word");
      res.redirect("/words/add");
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/guess-words", redirectLogin, async (req, res) => {
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
      await increaseUserCountersAftCompetition(userId, score);
      res.status(200).send("Successfully");
      res.end();
    } catch (error) {
      console.log("Errror", error);
    }
  }
});

router.get("/next-page", async (req, res) => {
  let { uid, lastVisible } = req.session.user;
  let data = await getNextPage(uid, lastVisible);
  req.session.user.lastVisible = data.next;
  res.json(JSON.stringify(data.words));
});

router.get("/prev-page", async (req, res) => {
  let { uid, lastVisible } = req.session.user;
  let data = await getPrevPage(uid, lastVisible);
  req.session.user.lastVisible = data.prev;
  res.json(JSON.stringify(data.words));
});

module.exports = router;
