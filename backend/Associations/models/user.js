var mongoose = require( "mongoose" ) ;

var userSchema = mongoose.Schema ( {
	email: String, 
	name: String,
	posts: [
	{ 
		type: mongoose.Schema.Types.ObjectId ,
		ref: "Post"  // singular name of the collection. mongoose object id belonging to Post. 
					 // Do not use postModel here.  
	}]
	
} ) ; 


module.exports = mongoose.model( "User", userSchema) ; 
// We can also return an object here and return multiple bits of data. 