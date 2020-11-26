const express = require("express");
const router = express.Router();
const firebase = require("firebase");

// Register User
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Account successfully created");
      res.redirect("/");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
});

// Login User
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Login successful");
      res.redirect("/");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      res.redirect("/login");
    });
});

// Logout User
router.get("/logout", (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Sign-out successful.");
      res.redirect("/");
    })
    .catch(function (error) {
      // An error happened.
    });
});

module.exports = router;
