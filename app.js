const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");

const routes = require("./routes/index");
const users = require("./routes/users");

// Init App
const app = express();

// Setup body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.use("/", routes);
app.use("/users", users)

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
