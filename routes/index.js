const express = require("express");
const router = express.Router();

// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", (req, res) => {
  let test = {
    titles: ["Context", "Answer"],
    data: [
      {
        contextWord: "Contextword here...",
        answers: ["Answer1 here.."],
      },
    ],
  };
  res.render("dashboard", {
    teableData: { titles: test.titles, data: test.data },
  });
});

module.exports = router;
