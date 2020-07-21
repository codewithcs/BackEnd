var express = require("express") ;
var router = express.Router(); 

var passport = require("passport");

var User = require("../models/user")

var middleware = require("../middleware") ;

// root route. 
router.get("/" , function(req, res) {  // landing page. 
res.render("landing") ; // landing.ejs does not belong to either campgrounds or comments. 
}) ; 


// =========
// AUTH ROUTES
// =========

// show register form
router.get("/register", function(req, res) {
	res.render("register"); 
})


// handle sign up logic 
router.post("/register", function(req, res) {
	
	//res.send("Signing you up...."); 
	
	var newUser = new User({username: req.body.username}) ;
	
	User.register(newUser, req.body.password, function(err, user){
	
		if ( err ) {
		
		req.flash("error", err.message );  // err comes from passport. 
			
	// If we try to register with the same username again, it will take us back to the form. 
			return res.render("register")
		} 
		
		passport.authenticate("local")( req, res, function() { 
			// authenticate and log the user in. 
			
			req.flash("success", "Welcome to Yelpcamp " + user.username ); 
			// can also use req.body.username 
			// We use the one that we get back from the database. 
			
			res.redirect("/campgrounds"); 		
			
		}) ; 
		
	} ) ; 
	
}) ; 

// Show login form: For login we need a get and post request. 
// The middleware will take care of all the complex logic

router.get("/login", function(req, res) {
	
	res.render("login", { message: req.flash("error") } ); 
} );

router.post("/login", passport.authenticate("local" , 
										
{
	successRedirect:"/campgrounds", // Problem: does not redirect to /campgrounds on successful login. 
	failureRedirect: "/login" 
}) , 
	
	function(req, res) {
	
});



router.get("/logout", function (req, res) {
	
	req.logout();
	
	req.flash("success", "Logged you out!"); 
	
	res.redirect("/campgrounds"); 
	
}) ;



module.exports = router; 

/*
We need to let these files know what variable app is. 
isLoggedIn is also used with Comments. 

So, we have to importy this there also. 

*/
