var mongoose    = require ("mongoose") ; 

var Campground  = require("./models/campgrounds") ; 

var Comment 	= require("./models/comment") ; 

// Create seed data. 
var data = [ { 
	name: "Cloud's Rest", 
	image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419__340.jpg",
	description: "blah blah blah"
}, 
{ 
	name: "Salmon Creek",
	image: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197__340.jpg",
	description:  "This is Salmon Creek. Welcome!!!"
} , 
			
	{ 
	name: "Smoky Mountain",
	image: "https://cdn.pixabay.com/photo/2015/09/14/13/57/campground-939588__340.jpg",
	description: "Welcome to the Smoky Mountains. Enjoy!!!"
	} 
] ; 


// Remove already existing data from the database. 
function seedDB() {
	
// Remove campgrounds. 	
Campground.remove( {} , function (err) { // remove everything, so pass in empty object. 
	
	if ( err ) {
		console.log(err) ;
	} 
	
	console.log("Removed campgrounds!");
	
	Comment.remove({}, function(err){
	
		if (err) {
			console.log(err);
		}		
				   
	console.log("Removed Comments!");
		
		// Add a few campgrounds. Only execute after the campgrounds have been removed. 
		data.forEach( function(seed) {
		
		Campground.create( seed, function(err, campground) { 
			
			// data is the newly created object returned from the server. 
			
			if ( err ) {
				console.log(err) ; 
			}  else {
				console.log("Added a campground!!!") ; 
				
				// Create a Comment. Same comment for all 3 campgrounds. 
				Comment.create( {
					text: "This place is great but I wish there was more Internet",
					author: "John"
				} , function (err, comment ) { 
					
					if ( err ) { 
						console.log(err ) ; 
					 } 
					
					else {
						
						// Associate this comment with the campground. 
						campground.comments.push(comment) ; 
						campground.save() ; 
						console.log("Created new comment") ; 
					}
					// If the comment creation is successful, only then associate it with a campground.									
				} ) ; 
							
			}
			
		} ) ; 
		
	}) ;
		
	});
	
} ) ; 

	
	// Add a few comments. 		
	
}

module.exports = seedDB ;