const express = require("express");
const router = express.Router();
const firebase = require("firebase");

// Register User
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { username, email, password, password2 } = req.body;

  // Validation
  req.checkBody("username", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.check("password", "Password is required").notEmpty();
  req.check("password2", "Confirm Password is required").notEmpty();
  req
    .check("password2", "Password and confirm password does not match")
    .equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    res.render("register", {
      errors: errors,
    });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        req.flash("success_msg", "You are registered and can now login");
        res.redirect("/users/login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        req.flash("error_msg", errorMessage);
      });
  }
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
      req.flash("success_msg", "Login successful");
      res.redirect("/");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      req.flash("error_msg", errorMessage);
      res.redirect("login");
    });
});

// Logout User
router.get("/logout", (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      req.flash("success_msg", "You are logged out");
      res.redirect("/");
    })
    .catch((error) => {
      throw error;
    });
});

module.exports = router;
