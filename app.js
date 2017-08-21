const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser')
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

// app.post("/", function(req, res)){
//   let newEntry = req.body.newEntry
//
// }



// app.post("/", function (req, res) {
//   todoList.push(req.body.todo);
//   console.log("pushed!");
//   console.log(toDoList(toDoList.length));
//   res.redirect('/');
// });

// app.post('/', function(req, res){
//   var email = req.body.email;
//   var html = '<p>Your user name is: </p>' + email;
//   res.send(html);
// });


app.listen(3000, function () {
	  console.log("Successfully started express application!");
    console.log(todoList);
});
