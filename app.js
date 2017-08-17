
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParse = require('body-parser')
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache")

const todos = [
  "Wash the car",
  "Make chili"
];

app.get("/", function (req, res) {
  res.render('index', { todos:todos });
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
})


app.listen(3000, function () {
	  console.log("Successfully started express application!");
})
