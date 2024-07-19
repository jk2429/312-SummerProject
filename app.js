const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//ADD DATABASE
//mongoose.connect();

//ADD DATABASE SCHEMA HERE

app.get("/", function(req, res) {
	res.render("home");
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});