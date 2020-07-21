var mongoose 				= require ("mongoose"),
	express  				= require ("express") ,
	bodyParser 				= require("body-parser"),
	passport	  			= require("passport"),
	
	User 					= require ("./models/user" ); 
	
	localStrategy			= require("passport-local"), 
	passportLocalMongoose	= require("passport-local-mongoose"); 
	app 					= express() ; 
  
mongoose.connect( "mongodb://localhost:27017/userAuthApp", { useNewParser: true } ) ; 

/// can also do require("express-session") separately. 

app.use(	require("express-session")	(	{ // app.use on something we are requiring and executing with some options.

		secret:"Rusty is the best", // can be anything at all. Usually just English words. 
		resave: false ,
		saveUnitialized: false
	// if we leave these 2 things we will get a message to add them in. 
	
}	) ); 

// Have to pass in 3 different options in order for it to work with Passport. 
// secret will be used to encode and decode the sessions. 
// We won't store data inside the session as it normally looks ( plane English ). It will be encoded. 
// And the secret that we create here is going to be used to decode the information in the session. 

app.set( "view engine", "ejs" ) ;
app.use(bodyParser.urlencoded({extended: true} ) ) ; 

 
app.use(passport.initialize() ) ; // tell express to use passport. 
app.use(passport.session() ) ; // need these 2 lines anytime we are going to use passport. 


app.use( new  localStrategy( User.authenticate() )) ;
// We are creating a new local strategy using User.authenticate() method. 
// User.authenticate() is coming from passportLocalMongoose. 

passport.serializeUser( User.serializeUser() ) ;
passport.deserializeUser ( User.deserializeUser() ) ;  // User model

/*
Responsible for reading the session, taking data from the session that is encoded
and unencoding it (deserialize). 

then encoding it, serializing it and putting it back in the session which is what
serializeUser() does. 

by using plugin() in user.js we have added these methods directly. 
we dont have to define User.serializeUser(), etc functions. 

telling passport to use the functions already defined in the User. 

*/

// ===========================================================================================================

// ROUTES


app.get("/", function(req, res) {
	res.render("home") ; 
}) ; 

app.get("/secret", isLoggedIn, function(req, res) { // When a request comes to /secret, it runs isLoggedIn 
	res.render("secret") ; 
});


// Auth Routes.
// Show Sign Up Form here. 

app.get( "/register", function(req, res) {
	res.render("register") ;  
}) ; 

// Handling User Sign Up 
app.post( "/register", function( req, res ) { 
	// The form sends data in the body, We need body-parser to use something like req.body.name, etc. 
	
	
User.register ( new User ( { username: req.body.username } ) , req.body.password , function(req, user) {
	
	if ( err ) {
		console.log(err) ; 
		return res.render("register") ; // If there is an error, render the "register.ejs" page. 
	}
	
	// passport.authenticate will log the user in. it will take care of everything in the session, store the correct
	// information, run the serializeUser() method that we specified above.  
	
	// We are specifying that we want to use the "local" strategy. 
	
	// In future if we want to use another strategy we can change the passed string to say "twitter" ( More complicated ). 
	
	
	passport.authenticate("local")( req, res, function() { // this will log the user in. It will take care of everything in 
														// the session, store the correct information. 
		// It will run the serializeUser method and we are specifying that we want to use the local strategy.
		// 
		
		res.redirect("/secret") ; 
		
	} ) ;
	
	
}) ;
	
	
}) ; 

/*

We do not actually save the password in the database. 
We pass the password as 2nd argument to User.register(). 

User.register will take this user that has this username and will hash the 
password ( convert it into a huge string ) and will this conversion of password in the database.

If everything goes well, it will return the new user which has the username 
and which has the hashed password as well. 

*/

// LOGIN ROUTE: 
// render login form 

app.get("/login", function( req, res ) {
	
	res.render("login") ;
	
}) ;

// login logic, data from the form is in req.
// Won't do it in the callback but in the second argument. 

app.post( "/login", passport.authenticate( "local" , { successRedirect: "/secret" , failureRedirect:"" } ) , function(req, res) {
	
} ) ; 

/*

When our app gets a post request to login, it is going to run the Middleware code immediately. 
We can multiple middlewares. 
We can have things which run after we authenticate. 

They sit between the beginning of the route and the end of the route. 

It tries to log the user in. It checks the credentials. 
passport automatically takes the username and password from the form ( from the request body).

If it works, we redirect to "/secret"

*/


/*

isLoggedIn middleware: To check if the user is logged in or not. 
For logout, we just need a link. 

When we log a user out, we are not changing anything in the database. 
There is no transaction there. 

passport is destroying all the user data in this session. It is no longer keeping track of this user's data in this session
from request to request. 

In the secret route, we will check whether the user is logged in or not. 
Write a middleware called as isLoggedIn 

*/

app.get("/logout", function(req, res) {
	req.logout() ; // using passport
	res.redirect("/") ; 
}) ; 

function isLoggedIn( req, res, next ) { // takes 3 parameters. Kind of like standard for middleware. 
	
	if ( req.isAuthenticated() ) {
		return next() ; 
	}
	
	res.redirect("/login") ; 
	// next refers to the things ( generally a callback function ) which will run next. 
	
}

// req: request object, res: response object, next: 

app.listen(3000, function() {
	console.log("Listening!!!") ;
}) ;
