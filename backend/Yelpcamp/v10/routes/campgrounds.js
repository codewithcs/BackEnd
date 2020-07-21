
// ==================
// CAMPGROUND ROUTES
// ==================

var express = require("express") ;
var router = express.Router(); 

var Campground = require("../models/campgrounds");

var middleware = require("../middleware") ; // will get the contents of index.js by default. 
	

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
router.post( "/", middleware.isLoggedIn, function(req, res) { 
	
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
router.get( "/new", middleware.isLoggedIn, function(req, res) {
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


// EDIT CAMPGROUND ROUTE 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", { campground: foundCampground } ) ;
	}) ;
	// No need to check for err as we have already checked it in the 
	// middleware. 
	
	
}); 


// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	// find and update the correct campground. 
	// and then redirect to show page.  

	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id );
		}
		
	}); 
	
}); 

// We can find by id and update separately but mongoose has a method 
// called findByIdAndUpdate()


// DESTROY CAMPGROUND ROUTE. 
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	
	Campground.findByIdAndRemove(req.params.id, function(err) {
		
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds") ; 	
		}
		
	}) ; // can't go to the show page as that item has been deleted and there
});  	 // is no show page. 




module.exports = router; 