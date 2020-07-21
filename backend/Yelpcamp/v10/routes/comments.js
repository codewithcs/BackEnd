// ===========================================================================================
// Comments ROUTES
// ===========================================================================================


var express = require("express") ;
var router = express.Router({mergeParams: true}); 

var middleware = require("../middleware") ;

// We made mergeParams: true so that we can access :id inside the comment routes. 

var Campground = require("../models/campgrounds"),
	Comment = require ("../models/comment")


router.get ( "/new" , middleware.isLoggedIn, function (req, res) {
	
	// find campground by id and send it through with render function. 
	
	Campground.findById(req.params.id, function( err, campground ) {
		
	if ( err ) {
		console.log(err) ;
	}  else {
		res.render("comments/new" , { campground : campground }  ) ; 
	}
		
	} ) ;
	
} ) ; 


router.post ( "/" , middleware.isLoggedIn, function (req, res) { 

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

// COMMENTS EDIT ROUTE 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	 
	Comment.findById(req.params.comment_id, function(err, foundComment ) {
			res.render("comments/edit", { campground_id: req.params.id, comment: foundComment } ) ;		
	});
	
}) ;

// COMMENTS UPDATE ROUTE: /campgrounds/:id/comments/:comment_id 
// We have an id for the campground here as the complete route gets formed by appending of passed string
// in app.use().

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) 
	
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		
		if (err) {
			res.redirect("back") ; 
		} else {
			res.redirect("/campgrounds/" + req.params.id ) ;  
		}
		
	} ) ; 

} ) ; 

/*
Comment Destroy Route:
/campgrounds/:id/comments/:comment_id

*/

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res ) {
	// findByIdAndRemove
	Comment.findByIdAndRemove (req.params.comment_id, function(err) {
		
		if(err) {
			res.redirect("back"); 
		} else {
			res.redirect("/campgrounds/" + req.params.id ); 
		}
		
	} ); 
	
	
}); 


module.exports = router; 


/*
We pass the currently logged in user to every single file. 
So can access it using req.user. 
*/