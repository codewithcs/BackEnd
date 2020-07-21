var mongoose = require("mongoose") ; 

mongoose.connect( "mongodb://localhost:27017/blogApp2", { useNewParser: true } ) ;

var postModel = require ("./models/post") ; 
var userModel = require ("./models/user") ;

// ===================================================================================================
// To reference the current directory we use a ./ 

// USER: email, name 
// var userSchema = mongoose.Schema ( {
// 	email: String, 
// 	name: String,
// 	posts: [
// 	{ 
// 		type: mongoose.Schema.Types.ObjectId ,
// 		ref: "Post"  // singular name of the collection. mongoose object id belonging to Post. 
// 					 // Do not use postModel here.  
// 	}]
	
// } ) ; 

//var userModel = mongoose.model( "User", userSchema) ;  // try to change the var name and the first argument name. 

// can call a function on userModel. 

// =============================================================================================


// userModel.create ( {  // can be accessed in mongo shell through db.users. ... 
// 					  // name of the collections is "users"
// email: "bob2@gmail.com", 
// name : "bob2"
// } , function ( err , user) {
// 	if ( err ) {
// 	console.log(err) ;
// 	}	
// 	else {
// 		console.log("New User created") ; 
// 	}	
	
// } ) ;

/*
postModel.create ( {  // created in the collections named as "posts". 

	title: "How to create the best burger? Part 3 ",
	content: "blah blah blah blah Part 3"
	
} , function ( err, post ) { // server sends the created post back in post object. 
	
	if ( err ) {
		console.log(err) ; 
	} else {
	 
	userModel.findOne ( {   // If post is successfully created, then will find the user. 
	name: "bob2"
	} , function ( err, userFound ) {
		
		if ( err ) {
			console.log(err) ; 
		} else {
			userFound.posts.push(post) ;  // post is the post that we just created and saved to the database. 
			
			userFound.save( function(err, user) {
				
				if (err) {
					console.log(err) ; 
				} else {
					console.log("User saved successfully") ; 
				}
				
			} ) ;
			
			
		}

	}	
				) ; 
	} 

} ) ; */
	
// Find user and all the posts for that user. 

// long query having multiple pieces. 
userModel.findOne ( { email: "bob2@gmail.com" } ).populate("posts").exec( function( err, user ) { 
						// user has the data for that user sent back by the server. 
						// "posts" refers to the "posts" attribute.  
	if ( err ) {
		console.log(err) ; 
	} else {
		console.log(user) ; 
	}
	
} ) ; 

// Now posts isn't just an array of object ids. It actually has full posts in there. 
// It will have content and title along with id. 
// If suppose a user has 3 ids in the "posts" array. Now these 3 elements of the posts array will have
// complete details of that post.   

// Finding a user, populate the "posts" attribute for that user




// We have to connect a post and a user using the post id. 


// Already created 1 user and 1 post. See the database to get list of already created stuff. 

/*
Referencing data instead of embedding it. 
In the posts array, we will store ids. 
These ids correspond to individual posts. 

*/