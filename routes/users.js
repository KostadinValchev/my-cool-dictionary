const express = require("express");
const router = express.Router();
const validator = require("../utils/validator");
const {
  createWithEmailAndPassword,
  createProfileDocument,
  signInWithEmailAndPassword,
  logout,
  redirectHome,
  redirectLogin,
} = require("../models/user");
const csrf = require("csurf");

const csrfProtection = csrf();

// Set CSRF protection
router.use(csrfProtection);

router.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors
  res.status(403);
  req.flash("error_msg", "Something went wrong! Try again");
  res.redirect(req.originalUrl);
});

// Register User
router.get("/register", redirectHome, (req, res) => {
  res.render("users/register", { csrfToken: req.csrfToken() });
});

router.post("/register", redirectHome, async (req, res) => {
  const { username, email, password, password2 } = req.body;

  // Validation
  let validationErrors = validator.registerForm(req);

  if (validationErrors) {
    res.render("users/register", {
      errors: validationErrors,
    });
  } else {
    try {
      const user = await createWithEmailAndPassword(email, password, username);
      await createProfileDocument(user, { displayName: username });
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
router.get("/login", redirectHome, (req, res) => {
  res.render("users/login", { csrfToken: req.csrfToken() });
});

router.post("/login", redirectHome, async (req, res) => {
  const { email, password } = req.body;

  const validationErrors = validator.loginForm(req);

  if (validationErrors) {
    res.render("users/login", { errors: validationErrors });
  } else {
    try {
      let user = await signInWithEmailAndPassword(email, password);
      req.session.user = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      };
      req.flash("success_msg", "Login successful");
      res.redirect("/");
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      req.flash("error_msg", errorMessage);
      res.redirect("login");
    }
  }
});

// Logout User
router.get("/logout", redirectLogin, async (req, res) => {
  try {
    await logout();
    delete req.session.user;
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
