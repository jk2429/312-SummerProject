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

//Home page
app.get("/", function(req, res) {
	res.render("home");
});

//Blog page
app.get("/blog", function(req, res) {
	res.render("blog");
});

//Profile page
app.get("/profile", function(req, res) {
	res.render("profile");
});

//Signup page
app.get("/signup", function(req, res) {
	res.render("signup");
});

//Login page
app.get("/login", function(req, res) {
	res.render("login");
});

//Create blog
app.get("/newPost", function(req, res) {
	res.render("newPost");
});

//Search Engine Query
app.post("/search", function(req, res) {
	//TODO
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});