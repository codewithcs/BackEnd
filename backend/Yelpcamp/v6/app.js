var express		= require("express") ;
var app 		= express() ; 
var request 	= require("request") ;

var bodyParser  = require("body-parser") ;

var Campground  = require ( "./models/campgrounds" ) ; 
// can name it anything. 

var Comment 	= require(	"./models/comment") ; 

var mongoose    = require("mongoose") ;

var seedDB 		= require("./seeds") ;  // ./ to look for this file in the current directory. 
 

var passport = require("passport");
var LocalStrategy = require("passport-local")
var User = require("./models/user")



mongoose.connect( "mongodb://localhost:27017/yelp_camp", { useNewParser: true } ) ; 
// checks if yelp_camp database is already created or not. 

app.use( bodyParser.urlencoded( { extended: true } ) ) ;

app.set("view engine", "ejs") ;


// create a new database yelp_camp. 
// mongod is running on 27017 port number.  
// While working with a database, check whether data is already present or not. 

seedDB() ; // we want to export a function.



// PASSPORT CONFIGURATION
app.use(require("express-session")({
	
	secret: "Once again Rusty wins cutest dog", 
	resave: false, 
	saveUninitialized: false  
	
}) ) ;

app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy( User.authenticate() ) );  // middleware. 
// authenticate() method comes with Passport local strategy.  
// give the local strategy that we imported. 

passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser());

// Pass req.user to every single template. 
// This is a middleware that will run for every single route. 
// If we don't have next() nothing will happen. 
app.use(function(req, res, next) {
	res.locals.currentUser = req.user; 
	next(); // move on to the actual next code. 
});


app.get("/" , function(req, res) {  // landing page. 
res.render("landing") ; // landing.ejs does not belong to either campgrounds or comments. 
}) ; 


// INDEX ROUTE
app.get("/campgrounds" , function(req, res) { // displays all our campgrounds. 
	// Now we will get the campgrounds from the server. 

	Campground.find({} , function (err, allCampgrounds) {
		if ( err ) {
			console.log(err); 
		} else {
			res.render( "campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user } ) ;	
			// Full campgrounds array is sent back by the server in campgrounds.
		}
	}); 
	
	//
	
} ) ;

// CREATE ROUTE 
app.post( "/campgrounds", function(req, res) { 
	
	// Create a new campground                      
	// get data from form and add to campgrounds array
	// redirect back to campgrounds page.
	var campname = req.body.campname ; 
	var campimage = req.body.image ;
	var cdescription = req.body.description ; // rhs wala description is the value of name attribute of input tag in new.ejs
	
	Campground.create (
		{
		name: campname,
		image: campimage, 
		description: cdescription
		}, function(err, campground){
		if (err) {
			console.log(err) ;
		} else {
			res.redirect("/campgrounds") ;
			
			// By default a GET request. Change name of campgrounds.ejs to index.js
		}   // render() takes file names while redirect takes name of routes. 
	}
	
	) ; 
	

});   


// NEW ROUTE: Displays form to submit data for a new campground. 
app.get( "/campgrounds/new", function(req, res) {
	res.render("campgrounds/new") ; 
}) ; 


/*

We have to have 2 routes to send a POST request. One to show the form and one
to handle the POST request from submitting that form. 

*/

// SHOW ROUTE: 

/* Have a button on every campground's image by which 
 we can view extra information about that campground. 
For example: On reddit, for a post we just see the title, we get more information on clicking that link.

*/

app.get("/campgrounds/:id" , function(req, res) { // this has to be after /campgrounds/new route. 
	
	// /campgrounds/:id is saying anything after campgrounds. find the campground with provided id.
	// render show template with that campground. 
	
	// capture the id of the campground here and display the campground. 
	
	// what if we have already populated for this campground ? 
	
	Campground.findById(req.params.id).populate("comments").exec ( function ( err, foundCampground ) { 
		if ( err ){
			console.log(err) ;  // pass the same callback in exec.
		} else {
			res.render("campgrounds/show", { campground: foundCampground } ) ; 
		}
	});
	
	// Populate the comments field on that campground. With exec we execute the query
	// that we made. Now we access campground.comments field in our "show.ejs" file. 
	
	// For campgrounds we will use ids generated by mongo. 
	// mongoose provides a findById() function. 
	
	
});



// ===========================================================================================
// Comments ROUTES
// ===========================================================================================

app.get ( "/campgrounds/:id/comments/new" , isLoggedIn, function (req, res) {
	
	// find campground by id and send it through with render function. 
	
	Campground.findById(req.params.id, function( err, campground ) {
		
	if ( err ) {
		console.log(err) ;
	}  else {
		res.render("comments/new" , { campground : campground }  ) ; 
	}
		
	} ) ;
	
	
} ) ; 


/*
Everytime we run our app, new campgrounds are created and the ids keep changing. 

*/

/*

	// render a template. But we can't render the same new.ejs as we are also rendering this file when we visit the 
	// /campgrounds/new route. 
	
	/*
	To overcome this we can split our views directory into two sub directories called 
	campgrounds and comments. Create a new.ejs file in the comments directory. 
	
	The file name that we pass in res.render("filename"), it is served from views directory.  
	And now we will serve it from comments directory present inside the "views" directory. 
	
	Change the filename in the routes that are for campgrounds. 
	
	Since we have moved the files, so now we will need to change how we are linking with the partials. 
	So for the files present in campgrounds and comments directory inside of views directory, we will need to go one 
	path backwards. 

*/

app.post ( "/campgrounds/:id/comments" , function (req, res) { 

	// look up campground using id, Create new comment, Connect new comment to a campground. 
	// Redirect to the show page of the campground that we are already on. 
	
	Campground.findById ( req.params.id, function ( err, campground )  {
						
	if( err ) {
		console.log(err) ;
		res.redirect("/campgrounds") ; 
		// If we can't find the campground that we are adding comment to then we just redirect to /campgrounds. 
		
	} else {
		
		// Add the data returned from the form into the Comments model.  
		// req.body.comment: pre made object that we get from the form. 
		
		Comment.create( req.body.comment  ,function ( err, comment ) { 
		
		if ( err ) {
			
			console.log(err) ; 
			
		} else {
			
			campground.comments.push(comment) ; 
			campground.save() ; 
			
			res.redirect("/campgrounds/" + campground._id ) ; 
			
		}
			
		} ) ;
		
		
	}
						 
	} ) ; 
	
	
} ) ; 

// =========
// AUTH ROUTES
// =========

// show register form
app.get("/register", function(req, res) {
	res.render("register"); 
})


// handle sign up logic 
app.post("/register", function(req, res) {
	
	//res.send("Signing you up...."); 
	
	var newUser = new User({username: req.body.username}) ;
	
	User.register(newUser, req.body.password, function(err, user){
	
		if ( err ) {
			console.log(err);  // If we try to register with the same username again, it will take us back to 									  the form. 
			return res.render("register")
		} 
		
		passport.authenticate("local")( req, res, function() { // authenticate and log the user in. 
			res.redirect("/campgrounds"); 						   
		}) ; 
		
	} ) ; 
	
}) ; 

// Show login form: For login we need a get and post request. 
// The middleware will take care of all the complex logic

app.get("/login", function(req, res) {
	
	res.render("login") ; 
} );

app.post("/login", passport.authenticate("local" , 
										
{
	
	failureRedirect: "/login"
}) , 
	
	function(req, res) {
	res.render("login") ; 
	
});

/*
app.post("/login", function(req, res) {
	
}) ; 

Instead, we can do the login using a middleware. 
This is a passport.authenticate() middleware. 

successRedirect: go to this route on successful login of the user. 

We use a different version of passport.authenticate in User.register(). 

In register we do other things before we run passport.authenticate()

In /login, the user is presumed to exist already, so we just log them in. 

*/


app.get("/logout", function (req, res) {
	
	req.logout();
	res.redirect("/campgrounds"); 
	
}) ;


function isLoggedIn(req, res, next) { // next will be called after the middleware. 
	
	if ( req.isAuthenticated() ) {
		return next() ; 
	}
	
	res.redirect("/login"); 
	
}



app.listen( 3000, function() {
	console.log("Yelpcamp server started") ; 
} ) ;


