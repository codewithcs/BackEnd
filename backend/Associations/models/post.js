var mongoose = require("mongoose") ; 

var postSchema = mongoose.Schema ( {
	title: String, 
	content: String
}) ; 


module.exports = mongoose.model( "Post", postSchema ) ;

// module.exports is like a return value for a file. 

// If we just include the file and do not export anything out of it, we
// will actually be including nothing. 
// We will just be requiring an empty file. 
/*
We want to export the model. 

*/





