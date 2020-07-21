var request = require  ('request') ;

request('http://www.google.com' , function (error, response, body) { 

	if ( !error && response.statusCode == 200 ) {
		console.log(body) ; 
	}
	
}) ;

/*
Need a callback because it is not instantaneous.
The stuff which came back from the server is in body. 
We can do the same thing with an API.
*/












