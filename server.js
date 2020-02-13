// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var performanceNow = require("performance-now");


const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));


// HTML Routes 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

var db = [];
fs.readFile("./db/db.json", (err, data) => {
  if (err) throw err;

  db = JSON.parse(data);
}); 

// API Routes
app.get("/api/notes", (req, res) => {
  return res.json(db);

});

// ------------------------------------------------------
app.post("/api/notes", (req, res) => {
  console.log(req.body)
  var id = {"id":performanceNow()};

  var data = { ...req.body, ...id};
  db.push(data);

  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
  });

  res.json(db);
});



// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
