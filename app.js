
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParse = require('body-parser')
const app = express();
const todoList = require('./data.js');

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render('index',todoList);
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
});


app.listen(3000, function () {
	  console.log("Successfully started express application!");
    console.log(todoList);
});
