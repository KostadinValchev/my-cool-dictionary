const express = require("express");
const router = express.Router();
const { redirectLogin, getUserStats } = require("../models/user");
const { getFirstTenWordsFromDatabase } = require("../models/word");

// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", redirectLogin, async (req, res) => {
  let userId = req.session.user.uid;
  let dbRes = await getFirstTenWordsFromDatabase(userId);
  let stats = await getUserStats(userId);
  res.render("dashboard", {
    teableData: {
      titles: ["Context", "Answer"],
      data: dbRes.words,
      lastVisible: dbRes.lastVisible,
    },
    totalWords: 23445512,
    stats,
  });
});

module.exports = router;
