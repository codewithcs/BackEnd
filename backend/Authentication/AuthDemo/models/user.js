var mongoose = require("mongoose") ; 

var passportLocalMongoose = require("passport-local-mongoose") ; 

var userSchema = mongoose.Schema ( {
	username: String,
	password: String 
})  ;

userSchema.plugin(passportLocalMongoose);
// this adds a bunch of methods that come with passport-local-mongoose to userSchema. 

module.exports = mongoose.model("User", userSchema) ; 