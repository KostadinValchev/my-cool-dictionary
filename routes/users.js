const express = require("express");
const router = express.Router();
const validator = require("../utils/validator");
const userModel = require("../models/user");
const csrf = require("csurf");

const csrfProtection = csrf();

// Set CSRF protection
router.use(csrfProtection);

// Register User
router.get("/register", (req, res) => {
  res.render("register", { csrfToken: req.csrfToken() });
});

router.post("/register", async (req, res) => {
  const { username, email, password, password2 } = req.body;

  // Validation
  let validationErrors = validator.registerForm(req);

  if (validationErrors) {
    res.render("register", {
      errors: validationErrors,
    });
  } else {
    try {
      const user = await userModel.createWithEmailAndPassword(
        email,
        password,
        username
      );
      await userModel.createProfileDocument(user, { displayName: username });
      req.flash("success_msg", "You are registered and can now login");
      res.redirect("/users/login");
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      req.flash("error_msg", errorMessage);
    }
  }
});

// Login User
router.get("/login", (req, res) => {
  res.render("login", { csrfToken: req.csrfToken() });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.signInWithEmailAndPassword(email, password);
    req.flash("success_msg", "Login successful");
    // res.redirect("/");
    res.render("index", { user });
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    req.flash("error_msg", errorMessage);
    res.redirect("login");
  }
});

// Logout User
router.get("/logout", async (req, res) => {
  try {
    await userModel.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
