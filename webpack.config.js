const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  entry: [
    path.resolve("./public/js/init.js"),
    path.resolve("./public/js/playground-engine.js"),
    path.resolve("./public/js/counters.js"),
    path.resolve("./public/js/dashboard-utils.js"),
    path.resolve("./public/js/messenger.js"),
    path.resolve("./public/js/requester.js"),
    path.resolve("./public/js/retrieve-words.js"),
    path.resolve("./public/js/words-creator.js"),
    path.resolve("./public/css/style.css"),
    path.resolve("./app.js"),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
    publicPath: "http://localhost:3000",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          compact: true,
        },
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["css-loader?url=false"],
      },
      {
        exclude: /node_modules/,
        test: /\.handlebars$/,
        loader: "handlebars-loader",
      },
    ],
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
};
