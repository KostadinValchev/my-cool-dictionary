const express = require("express");
const router = express.Router();

// Homepage

router.get("/", (req, res) => {
  const { userId } = req.session;
  console.log(userId);
  res.render("index");
});

module.exports = router;
