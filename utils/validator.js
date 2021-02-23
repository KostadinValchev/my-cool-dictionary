const registerForm = (req) => {
  req.checkBody("username", "Name is required").notEmpty().trim().escape();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail().normalizeEmail();
  req.check("password", "Password is required").notEmpty().trim().escape();
  req.check("password2", "Confirm Password is required").notEmpty().trim().escape();
  req
    .check("password2", "Password and confirm password does not match")
    .equals(req.body.password);
  return req.validationErrors();
};

const loginForm = (req) => {
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty().trim().escape();

  return req.validationErrors();
};

const addWord = (req) => {
  const { contextWord, ...other } = req.body;
  let answers = Object.keys(other);
  req.checkBody("contextWord", "Context Word is required").notEmpty();
  req.checkBody("native1", "Native answer 1 is required").notEmpty();
  answers.shift();
  while (answers.length) {
    let currentAnswer = answers.shift();
    req.checkBody(currentAnswer, `${currentAnswer} is required`).notEmpty();
  }

  return req.validationErrors();
};

module.exports = {
  registerForm,
  loginForm,
  addWord,
};
