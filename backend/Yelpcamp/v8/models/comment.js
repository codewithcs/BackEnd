var mongoose = require("mongoose") ; 

var commentSchema = mongoose.Schema ( { 
	text: String, 
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User"
		},
		username: String
	}
} ) ;

				// compile the schema into a model. 

module.exports = mongoose.model( "Comment" , commentSchema) ; 

/*  First argument is the singular name of our model. 
	Display comments on show route. 
	
	NOTE: This is a js file and not a .ejs
	
*/