var mongoose = require("mongoose") ; 

// SCHEMA SETUP. 
var campgroundSchema = mongoose.Schema( {
	name: String, 
	image: String, 
	description: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User"
		}, 
		username:String
	},
	comments: [
		{
			type : mongoose.Schema.Types.ObjectId, 
			ref  : "Comment" // name of the comment model. 
		} 
	/* 
	
	What we are saying here is that comments property is an array of "Comment" ids. 
	We are not embedding actual comments in here. 
	We are just embedding an id or reference to the comments. 
	   
	*/
	
	]
}); 

// Compile into a model. 

var Campground  = mongoose.model("campground" , campgroundSchema ) ;  
 
module.exports  = Campground ; 


