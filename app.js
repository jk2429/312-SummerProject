const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Configure session for user login
app.use(session({
	secret: "key",
	resave: false,
	saveUninitialized: false
}));

//Set authentication
app.use(function(req, res, next) {
	res.locals.isAuthenticated = req.session.isAuthenticated || false;
	next();
});

//Configure multer for local storage saving for profile pictures
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function(req, file, eb) {
		cb(null, Date.now() + path.extname(file.orginalname));
	}
});

const upload = multer({ storage: storage });

//Middleware to check if session is valid
function checkAuthenticated(req, res, next) {
	if (req.session.isAuthenticated) {
		return next();
	} else {
		res.redirect("/login");
	}
}

//ADD DATABASE
//mongoose.connect();

//ADD DATABASE SCHEMA HERE
//User schema
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	bio: String,
	profilePicture: String
});

const User = mongoose.model("User", userSchema);

//Home page
app.get("/", function(req, res) {
	res.render("home");
});

//Blog page
app.get("/blog", function(req, res) {
	res.render("blog");
});

//Profile page
app.get("/profile", checkAuthenticated, function(req, res) {
	User.findById(req.session.userId, function(err, foundUser) {
		if (err || !foundUser) {
			res.redirect("/login");
		} else {
			res.render("profile", { user: foundUser });
		}
	});
});

//Signup page
app.get("/signup", function(req, res) {
	res.render("signup", { errorMessage: null });
});

app.post("/signup", function(req, res) {
	const newUser = new User({
		username: req.body.username,
		password: req.body.password,
		bio: req.body.bio,
		profilePicture: req.file ? '/uploads/' + req.file.filename : null
	});
	
	newUser.save(function(err) {
		if (err) {
			res.render("/signup", { errorMessage: "Please fill in all parts of the signup form" });
		} else {
			req.session.isAuthenticated = true;
			req.session.userId = newUser._id;
			res.redirect("/profile");
		}
	});
});

//Login page
app.get("/login", function(req, res) {
	res.render("login", {errorMessage: null});
});

app.post("/login", function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	
	User.findOne({ username: username, password: password }, function (err, foundUser) {
		if (err || !foundUser) {
			res.render("/login", { errorMessage: "Incorrect username or password" });
		} else {
			req.session.isAuthenticated = true;
			req.session.userIs = foundUser._id;
			res.redirect("/profile");
		}
	});
});

//Logout post
app.post("/logout", function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			return res.redirect("/profile");
		}
		res.redirect("/login");
	});
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