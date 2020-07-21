var express= require("express") ;
var app = express() ; 
var request = require("request") ;

var bodyParser = require("body-parser") ; 

app.use( bodyParser.urlencoded( { extended: true } ) ) ;

app.set("view engine", "ejs") ;

var campgrounds =[	
	{ name: "Salmon Creek" , image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732673d19544c758_340.jpg"	} ,
	{name: "Granite Hill" , image:"https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c732673d19544c758_340.jpg"  } ,
	{name: "Mountain's Rest" , image:"https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c732673d19544c758_340.jpg"	} ,
		] ;

// image urls could expire. 

app.get("/" , function(req, res) {  // landing page. 
res.render("landing") ; 
}) ; 

app.get("/campgrounds" , function(req, res) { // displays all our campgrounds. 
	
	res.render("campgrounds", { campgrounds: campgrounds } ) ;
	
} ) ;

app.post("/campgrounds", function(req, res) { // Create a new campground                      
	// get data from form and add to campgrounds array
	// redirect back to campgrounds page.
	var name = req.body.campname ; 
	var image = req.body.image ;
	
	var newCampground = { name: name, image: image } ;
	
	campgrounds.push(newCampground); 
	
	res.redirect("/campgrounds") ; // default way to redirect is through a GET request. 
	
});   

app.get( "/campgrounds/new", function(req, res) {
	res.render("new") ; 
}) ; 


app.listen(3000, function() {
	console.log("Yelpcamp server started") ; 
}) ;

/*
Create new campgrounds
Setup new campground POST route
Add in body-parser
Setup route to show form
Add basic unstyled form

Here we will have a form on a separate route. 
*/



