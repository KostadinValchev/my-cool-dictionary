const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const { redirectLogin } = require("../models/user");
const { getFirstTenWordsFromDatabase } = require("../models/word");

// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", redirectLogin, async (req, res) => {
  let dbRes = await getFirstTenWordsFromDatabase(req.session.user.uid);
  res.render("dashboard", {
    teableData: {
      titles: ["Context", "Answer"],
      data: dbRes.words,
      lastVisible: dbRes.lastVisible,
    },
  });
});

module.exports = router;
