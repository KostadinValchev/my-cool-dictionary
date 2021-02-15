const express = require("express");
const router = express.Router();
const validator = require("../utils/validator");
const {
  addWordDocument,
  getAllWordsFromDatabase,
  updateWordData,
  getNextPage,
  getPrevPage,
  getCustomDocumentsOrderAndLimitData,
  getDataFromToday,
  getDataFromWeek,
  checkSetup,
} = require("../models/word");
const {
  redirectLogin,
  increaseUserTotalWordsCounter,
  increaseUserCountersAftCompetition,
  getUserStats,
  setNewScoreResultFromUser,
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

router.get("/exercise/:type?", redirectLogin, checkSetup, async (req, res) => {
  let { type } = req.query;
  let { uid } = req.session.user;
  req.session.user.setuped = false;
  if (!type) res.redirect("/words/setup-exercise");
  switch (type) {
    case "Practice all the words":
      {
        let words = await getAllWordsFromDatabase(uid);
        res.render("words/guessTheWords", { words });
      }
      break;
    case "Practice daily":
      {
        let words = await getDataFromToday(uid);
        res.render("words/guessTheWords", { words });
      }
      break;
    case "Practice weekly":
      {
        let words = await getDataFromWeek(uid);
        res.render("words/guessTheWords", { words });
      }
      break;
    case "Practice the most wrong":
      {
        let topFailuresWords = await getCustomDocumentsOrderAndLimitData(
          uid,
          "failure",
          5
        );
        let words = JSON.stringify([...topFailuresWords]);
        res.render("words/guessTheWords", { words });
      }
      break;
  }
});

router.get("/setup-exercise", redirectLogin, async (req, res) => {
  let userStats = await getUserStats(req.session.user.uid);
  if (userStats.totalWords != 0) {
    let render = true;
    req.session.user.setuped = true;
    res.render("words/setup", { render });
  } else {
    res.render("words/setup");
  }
});

router.post("/setup-exercise", redirectLogin, (req, res) => {
  let { type } = req.body;
  type
    ? res.redirect("/words/exercise/?type=" + type)
    : res.redirect("/words/setup-exercise");
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
