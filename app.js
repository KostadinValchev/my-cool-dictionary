const express = require("express");
const bodyParser = require("body-parser");

// Init App
const app = express();

// Setup body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("It's working....");
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
