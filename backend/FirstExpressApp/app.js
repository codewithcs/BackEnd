var express = require("express") ;

var app = express() ; // returns a function which can call to many others.

// "/"

app.get("/" , function (req, res) {
	res.send("Hi there!") ; // Send this string.
}) ;

app.get("/bye" , function (req, res) {
	res.send("Bye!") ; 
}) ;

app.get("/cat" , function (req, res) {
	res.send("Meow!") ; 
}) ;

app.get("*" , function (req, res) {
	res.send("Not Found") ; 
}) ;


app.listen(3000, function() { // port to listen on
	console.log("Listening on Port 3000" ) ; 
}) ; 



