
var express = require("express") ;
var router = express.Router(); 

var passport = require("passport");

var User = require("../models/user")

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

router.get("/login", function(req, res) {
	
	res.render("login") ; 
} );

router.post("/login", passport.authenticate("local" , 
										
{
	
	failureRedirect: "/login"
}) , 
	
	function(req, res) {
	res.render("login") ; 
	
});



router.get("/logout", function (req, res) {
	
	req.logout();
	res.redirect("/campgrounds"); 
	
}) ;


function isLoggedIn(req, res, next) { // next will be called after the middleware. 
	
	if ( req.isAuthenticated() ) {
		return next() ; 
	}
	
	res.redirect("/login"); 
	
}

module.exports = router; 

/*
We need to let these files know what variable app is. 
isLoggedIn is also used with Comments. 

So, we have to importy this there also. 

*/
