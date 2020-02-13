// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");


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

var db = fs.readFile("./db/db.json", (err, data) => {
  db = JSON.parse(data);
}); 

// API Routes
app.get("/api/notes", (req, res) => {
  return res.json(db);

});


// Starts the server to begin listening
app.listen(PORT => {
  console.log("App listening on PORT " + PORT);
});
