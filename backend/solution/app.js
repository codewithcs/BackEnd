var express = require('express') ;

var app = express() ; 

app.get("/" , function (req, res) {
	res.send("/ path") ; 
}); 

app.get("/speak/:animal" , function (req, res) {
	var animal = req.params.animal.toLowerCase() ; // convert the value passed to lowercase 
	
	var sound = {
		cow: "Moo",
		dog: "Woof Woof" ,
		pig: "Oink",
		cat: "Meow", 
		goldfish: "..."
	}
	
	res.send( "The " + animal + " says " + sound[animal] ) ; 
	
}); 

app.get("/repeat/:message/:times" , function (req, res) {
		var message = req.params.message ;
		var times = Number(req.params.times) ;
	
		var result = "" ; 	
	
	for ( var i=0 ; i <times ; i++ ) {
		result += message + " ";
	}
	
	res.send(result) ; 
	
}); 

app.get("*" , function (req, res) {
	res.send("nothing matched!!"); 
}); 

app.listen(3000, function() {
	console.log("Listening for connections!!!");
});








































