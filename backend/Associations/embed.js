var mongoose = require("mongoose") ; 

mongoose.connect( "mongodb://localhost:27017/associations1", { useNewParser: true } ) ;

var postSchema = mongoose.Schema ( {
	title: String, 
	content: String
}) ; 

var postModel = mongoose.model( "Post", postSchema ) ; 

// USER: Email, name 
var userSchema = mongoose.Schema ( {
	email: String, 
	name: String,
	posts: [postSchema] // array of posts. for adding association.  
}) ; 

/*
Our userSchema looks like this: 
email: ""
name: ""
post: [ { title: "" , content: "" } , { } ] 

*/

var userModel = mongoose.model( "User", userSchema) ;  // try to change the var name and the first argument name. 

// can call a function on userModel. 

var newUser = new userModel ( {  // or userModel.create () can also be used. 
	email: "john2@brown.edu", 
	name: "john2"
} ) ;

newUser.posts.push ( {  // Or create a posts object separately and pass it as the argument. 
	title: "Feeling happy 2 ",
	content: "I am the best 2"
} ) ;

newUser.save( function ( err, user ) {   // save it in the database. 

	if ( err ) {
		console.log(err) ;
	} else {
		console.log("Second user added") ; 
	}
	
 } ) ;



// var newPost = new postModel ( {
// 	title: "Feeling happy",
// 	content: "I am the best"
// } ) ;

// newPost.save( function ( err, post ) { 
// 	// post has the data of the new post that gets created and is returned by the server.  

// 	if ( err ) {
// 		console.log(err) ;
// 	} else {
// 		console.log(post) ; 
// 	}
	
// } ) ;


// POST: title, content

// We have 2 schemas and 2 posts setup. 

/*
To create a relationship, we can embed data inside of the userSchema. 
post attribute inside of the user schema. 
And inside this post attribute, we have a bunch of posts. 

For embedding data, we need to define postSchema before we define userSchema. 

We need to figure out the correct post from the id stored in the posts[] array of the user.

*/


// Retrieve a user. To get back one user use findOne() 

userModel.findOne( { 
	name: "john" , function(err , user) {
		
		if ( err ) {
			console.log(err) ;
		} else {
			console.log(user) ; 
			
			user.posts.push( { 
			
				title: "This is Rusty",
				content: "Rusty feeling happy with me"
				
			} ) ; // push another post for this user. 
			
			user.save ( function ( err, user  ) {
				
				if ( err ) {
					console.log(err) ;
				} else {
					console.log(user) ;  // database gives back user that it saved. 
				}
				
			}) ;
	}
}  
	
} );












