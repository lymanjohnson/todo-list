const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser')
const app = express();
const todoList = require('./data.json');
const fs = require('fs');

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  fs.readFile('data.json','utf8', function readFileCallback(err,data){
    // console.log(data);
  if (err) {
    console.log(err);
  }
  else {
    let todoArray = JSON.parse(data);
    // let todoArray = obj.todos;
    console.log(todoArray);
    res.render('index', {todoArray : todoArray});
  }
})});


/*fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);//Turns data.json into an object named obj
    var todoarray = obj.todoArray; //declares makes the todoarray
    var donearray = obj.doneArray; //declares makes the donearray
    // this makes todosMustache the todoarray var
    res.render('index', { todosMustache: todoarray,  doneMustache: donearray});
*/

app.post("/", function(req,res) {
  let newEntry = req.body.newEntry
  fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    }
    else {
      let listObject = JSON.parse(data); //now its an object
      let newEntryObject = "{'item':'"+newEntry+"','category':'Home','status':'incomplete'}";
      listObject.push(newEntryObject); //pushes the text to an array
      let json = JSON.stringify(obj); //converts back to json
      fs.writeFile('data.json', json, 'utf8'); // writes to file
}});

  res.redirect('/');//reloads page
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
    // console.log(todoList);
});
