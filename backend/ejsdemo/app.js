var express =  require('express') ;

var app = express() ;

app.use( express.static(  "public") ) ; // serve files from the public directory. 

app.set("view engine", "ejs") ; 

app.get("/", function(req, res) {
	res.render("home");  // no need to write .ejs along with file name if we are using app.set above.
	// it will normally expect these to be ejs files. 
	
	// filename is passed as a string ; Will automatically look in the views directory.
}); 

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing ; 
	res.render("love", { thingVar: thing } ) ;
	// the server will send back the rendered page for love.ejs file. 
}); 

/*
How can we send an html file that display "you fell in love with" message ?
*/


app.get("/posts", function(req, res) {

var posts = [ {
	title:"Post 1",
	author:"Susy"
} , 
	{
	title:"Post 2",
	author:"Susy2"
	} , 
	
	{
	title:"Post 3",
	author:"Susy3"
	} ] ;

	res.render("posts" , { posts: posts } );	
	
}); 

app.listen(3000, function() {
	console.log("Listening!!!") ; 
});

















