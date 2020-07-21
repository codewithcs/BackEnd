var mongoose = require("mongoose") ; 

var commentSchema = mongoose.Schema ( { 
	text: String, 
	author: String
} ) ;

				// compile the schema into a model. 
module.exports = mongoose.model( "Comment" , commentSchema) ; 

/*  First argument is the singular name of our model. 
	Display comments on show route. 
	
*/