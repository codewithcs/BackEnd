
// ===========================================================================================
// Comments ROUTES
// ===========================================================================================


var express = require("express") ;
var router = express.Router({mergeParams: true}); 

// We made mergeParams: true so that we can access :id inside the comment routes. 

var Campground = require("../models/campgrounds"),
	Comment = require ("../models/comment")


router.get ( "/new" , isLoggedIn, function (req, res) {
	
	// find campground by id and send it through with render function. 
	
	Campground.findById(req.params.id, function( err, campground ) {
		
	if ( err ) {
		console.log(err) ;
	}  else {
		res.render("comments/new" , { campground : campground }  ) ; 
	}
		
	} ) ;
	
	
} ) ; 


router.post ( "/" , isLoggedIn, function (req, res) { 

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
		
		Comment.create( req.body.comment, function ( err, comment ) { 
		
		if ( err ) {
			
			console.log(err) ; 
			
		} else {
			
			// add username and id to the comment. 
			comment.author.id = req.user._id; 
			comment.author.username = req.user.username ; 
			comment.save(); 
			
			campground.comments.push(comment) ; 
			campground.save() ; 
			
			res.redirect("/campgrounds/" + campground._id ) ; 
			
		}
			
		} ) ;
			
	}
						 
	} ) ; 
	
} ) ; 


// middleware 
function isLoggedIn(req, res, next) { // next will be called after the middleware. 
	
	if ( req.isAuthenticated() ) {
		return next() ; 
	}
	
	res.redirect("/login"); 
	
}

module.exports = router; 


/*
We pass the currently logged in user to every single file. 
So can access it using req.user. 
*/