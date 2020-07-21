var mongoose = require ('mongoose') ;

// Connect to the running mongodb server

mongoose.connect("mongodb://localhost/cat_app");
// If cat_app is not there then it will create cat_app database for us else will use pre-existing one. 


var catSchema = new mongoose.Schema ( {
	name: String,
	age: Number, 
	temperament: String
}) ; 

// We defined a pattern. 
// can add new fields later. 


var Cat = mongoose.model("Cat", catSchema) ; /// first argument needs to be singular version of collection name. 
// compile the schema into a model. 
// This model now has methods in it. 
// Collection with name 'cats' is created. 
// There is a library that pluralizes things. 



/*
If we do 'show collections', we get back 'cats'
*/

/* one way to create a cat. 
var george = new Cat( {
	name: "Mrs. Muscle", 
	age: 5, 
	temperament: "Cute"
}) 

george.save( function(err, cat){  // This takes time, so we have to pass a callback function. 
	if(err) {
		console.log("Something went wrong!");
	} else {
		console.log("We just saved a cat to the DB") ;
		console.log(cat); // Data inside cat variable came back from the database. We try to save george in the database.  
	} 
}) ; 
*/


// this will add george to the database. 
// passing a callback so that we know that save was successful. 

/* Another way to create a cat. Use create() method
It is new and save all at once. */

Cat.create( { 
	name:"Snow",
	age:8,
	temperament:"Cool"
} , function(err, cat ) {
	if ( err ) {
		console.log(err) ;
	} else {
		console.log(cat) ; 
	}
	
}  ) ;

/* Retrieve cats*/

Cat.find({} , function(err, cats)  { // call the parameters anything. 
		 
if ( err ) {
	console.log("Oh No, Error!!!") ; 
	console.log(err); 
}	else {
	console.log("All the Cats...") ; 
	console.log(cats) ;
}
} ) ;

// passing empty object because we are not looking for any particular cat. 
// callback is executed when find() is done. 



// We compiled catSchema into a model and we save it to a variable Cat.
// first argument has to be singular version of the collection name. 
// By writing "Cat", it makes a collection Cats. There is a library for pluralizing. 

// Cat variable has all the methods that we want. 

/*
Tells javascript side of things that I want to be able 
to add cats to our database and a cat should be defined like these.
This is not defining a table but is defining a patter for our data.
It does not mean that we are forbidden from adding new stuff or leaving certain things off.
It is just a nice way to provide a structure as we need some sort of predictable structure to
write code that can handle these cats. 
*/

/*
Add a new cat to the db
Retrieve all the cats from the db 
*/

