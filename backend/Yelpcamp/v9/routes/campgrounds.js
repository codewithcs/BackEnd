
// ==================
// CAMPGROUND ROUTES
// ==================

var express = require("express") ;
var router = express.Router(); 

var Campground = require("../models/campgrounds");
	
	


// INDEX ROUTE : Only remove "campgrounds" from the first line. 

router.get("/" , function(req, res) { // displays all our campgrounds. 
	// Now we will get the campgrounds from the server. 

	Campground.find({} , function (err, allCampgrounds) {
		if ( err ) {
			console.log(err); 
		} else {
			res.render( "campgrounds/index", { campgrounds: allCampgrounds} ) ;	
			// Full campgrounds array is sent back by the server in campgrounds.
		}
	}); 
	
	//
	
} ) ;

// CREATE ROUTE 
router.post( "/", isLoggedIn,function(req, res) { 
	
	// Create a new campground                      
	// get data from form and add to campgrounds array
	// redirect back to campgrounds page.
	var campname = req.body.campname ; 
	var campimage = req.body.image ;
	var cdescription = req.body.description ; // rhs wala description is the value of name attribute of input tag in new.ejs
	
	var author = {
		id: req.user._id, 
		username: req.user.username
	}
	
	var newCampground = {name: campname, image: campimage, description: cdescription, author: author} ; 
	
	Campground.create (	newCampground, function(err, campground){
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
router.get( "/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new") ; 
}) ; 



router.get("/:id" , function(req, res) { // this has to be after /campgrounds/new route. 
	
	
	Campground.findById(req.params.id).populate("comments").exec ( function ( err, foundCampground ) { 
		if ( err ){
			console.log(err) ;  // pass the same callback in exec.
		} else {
			res.render("campgrounds/show", { campground: foundCampground } ) ; 
		}
	});
	
});

// middleware 
function isLoggedIn(req, res, next) { // next will be called after the middleware. 
	
	if ( req.isAuthenticated() ) {
		return next() ; 
	}
	
	res.redirect("/login"); 
	
}

module.exports = router; 

