const express = require("express");
const router = express.Router();
const { redirectLogin, getUserStats } = require("../models/user");
const {
  getFirstTenWordsFromDatabase,
  getCustomDocumentsOrderAndLimitData,
} = require("../models/word");

// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", redirectLogin, async (req, res) => {
  let userId = req.session.user.uid;
  let firstTenWords = await getFirstTenWordsFromDatabase(userId);
  let stats = await getUserStats(userId);
  let topSuccessedWords = await getCustomDocumentsOrderAndLimitData(
    userId,
    "success",
    5
  );
  let topFailuresWords = await getCustomDocumentsOrderAndLimitData(
    userId,
    "failure",
    5
  );
  req.session.user.lastVisible = firstTenWords.lastVisible;
  res.render("dashboard", {
    teableData: {
      titles: ["Context", "Answer"],
      data: firstTenWords.words,
    },
    totalWords: 23445512,
    stats,
    limitationsData: {
      titles: ["Name", "Quantity"],
      topSuccessedWords,
      topFailuresWords,
    },
  });
});

module.exports = router;
