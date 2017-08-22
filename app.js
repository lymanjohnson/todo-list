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
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  fs.readFile('data.json','utf8', function readFileCallback(err,data){
    // console.log(data);
  if (err) {
    console.log(err);
  }
  else {
    let todoFileContents = JSON.parse(data);
    let todoArray = todoFileContents.list;
    // let todoArray = obj.todos;
    console.log("Got!");
    console.log(todoArray);
    res.render('index', {todoMustache : todoArray});
  }
})});

app.post("/", function(req,res) {
  let newEntry = req.body.newEntry
  console.log("Post!");
  console.log("newEntry",newEntry);
  fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    }
    else {
      let todoFileContents = JSON.parse(data);
      console.log("todoFileContents",todoFileContents);
      let newEntryObject = {};
      newEntryObject.item = newEntry;
      newEntryObject.category = "Home";
      newEntryObject.status = "incomplete";
      console.log("newEntryObject",newEntryObject);
      todoFileContents.list.push(newEntryObject); //pushes the text to an array
      console.log("new array",todoFileContents);
      let json = JSON.stringify(todoFileContents); //converts back to json
      fs.writeFile('data.json', json, 'utf8'); // writes to file
}});
  console.log("about to redirect...");
  res.redirect('/');//reloads page
});


app.post("/:dynamic", function (req, res) {
  let clickedItem = req.params.dynamic;
  console.log(clickedItem);

  fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {

      let todoFileContents = JSON.parse(data); //now its an object

      for (i=0 ; i<todoFileContents.list.length ; i++){
        if (todoFileContents.list[i].item == clickedItem){
          todoFileContents.list[i].status = "complete";
        }
      }
      let json = JSON.stringify(todoFileContents); //converts back to json
      fs.writeFile('data.json', json, 'utf8'); // writes to file
  }});
  res.redirect('/');//reloads page
})


app.listen(3000, function () {
	  console.log("Successfully started express application!");
    // console.log(todoList);
});
