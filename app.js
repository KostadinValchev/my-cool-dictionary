const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const expressValidator = require("express-validator");
const firebase = require("./firebase/firebase.utils");

// Routes
const routes = require("./routes/index");
const users = require("./routes/users");
const words = require("./routes/words");

// Init App
const app = express();

// Initialize Firebase
firebase.init();

// Setup body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup View Engine Middleware
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "layout", extname: "handlebars" })
);
app.set("view engine", "handlebars");

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Express Session Middleware
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  // res.locals.user = req.user || null;
  next();
});

app.use("/", routes);
app.use("/users", users);
app.use("/words", words);

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
