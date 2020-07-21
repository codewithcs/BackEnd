var express = require('express') ;

var app = express() ;

var bodyParser = require('body-parser') ;

var friends= [ "abc" , "def" , "ghi" ,"xyz"] ;

app.use(bodyParser.urlencoded( {extended : true })  ) ; 
// See what this does.  

app.set("view engine", "ejs") ; 

app.get("/" , function(req, res) { // root  route. 
	res.render("home") ; 
});


app.post("/addfriend" , function(req, res) { 

	// console.log( req.body ) ;
	friends.push(req.body.myname) ; 
	// can use an if to avoid an empty string to be added as a friend. 
	res.redirect("/friends") ; 
	
}) ;

app.get("/friends" , function (req, res ) {
	
	res.render("friends" , {myfriends : friends}) ; 
}) ;

app.listen (3000 , function() {
	console.log("Listening"); 
})


/* NOTE: 
For every directory there is a separate server. 
We start a server for a particular project. 

res.send("") : Message sent by the server. 

*/