module.exports.registerForm = (req) => {
  req.checkBody("username", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.check("password", "Password is required").notEmpty();
  req.check("password2", "Confirm Password is required").notEmpty();
  req
    .check("password2", "Password and confirm password does not match")
    .equals(req.body.password);
  return req.validationErrors();
};
