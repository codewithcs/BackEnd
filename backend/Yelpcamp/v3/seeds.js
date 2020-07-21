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
Campground.remove( {} , function (err) { // remove everytjing, so pass in empty object. 
	
	if ( err ) {
		console.log(err) ;
	} else {
		console.log("Remove Successful") ;
		
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
					
					if ( err ) { console.log(err ) ; } else {
						
						// Associate this comment with the campground. 
						campground.comments.push(comment) ; 
						campground.save() ; 
						console.log("Created new comment") ; 
					}
					
					
					
				} ) ; 
				
				
			}
			
		} ) ; 
		
	}) ;
		
		
		
	}
	
} ) ; 

	// Add a few campgrounds. 
	
	// data.forEach( function(seed) {
		
	// 	Campground.create( seed, function(err, data) { 
			
	// 		// data is the newly created object returned from the server. 
			
	// 		if ( err ) {
	// 			console.log(err) ; 
	// 		}  else {
	// 			console.log("Added a campground!!!") ; 
	// 		}
			
	// 	} ) ; 
		
	// }) ;
	
	
	
	// Add a few comments. 
	
	
	
	
}

module.exports = seedDB ;




/*
To run this, we will require it in app.js file. 

There is no guarantee that the code of data.forEach will be executed after Campground.remove() code. 
Campground.remove() can execute afterwards also. 

Initially we are not removing comments. We fix that later. 

*/


