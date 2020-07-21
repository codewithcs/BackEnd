const 	express		= require("express"),
      	app 		= express(), 
    	request 	= require("request"),

	 	bodyParser  = require("body-parser"),
 
    	Campground  = require ( "./models/campgrounds" ), 
// can name it anything. 

	    Comment 	= require(	"./models/comment"),

    	mongoose    = require("mongoose"),

	    seedDB 		= require("./seeds"),  // ./ to look for this file in the current directory. 
 

	 	passport = require("passport"),
   		LocalStrategy = require("passport-local"),
 	    User = require("./models/user"),

	  // Requiring Routes. 
   		commentRoutes = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes = require("./routes/index") ; 
					   


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

/*
app.use(campgroundRoutes);
app.use(indexRoutes) ;
app.use(commentRoutes); 
*//* tells our app to use to those 3 files that we have required. */

/// We can also do the following: 
app.use("/campgrounds",campgroundRoutes); // appends "/campgrounds" to all the campground routes, that is all routes in the campgrounds.js file. 

app.use("/campgrounds/:id/comments",commentRoutes) ;

app.use(indexRoutes); // can also do: ("/", indexRoutes)

/* 	To make :id through to the comment routes, we use mergeParams: true in the Router function
	in comments.js file. */


app.listen( 3000, function() {
	console.log("Yelpcamp server started") ; 
} ) ;