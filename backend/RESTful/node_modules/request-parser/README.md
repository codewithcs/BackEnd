Request-Parser
==============
[![Build Status](https://travis-ci.org/Onfire7/request-parser.png)](https://travis-ci.org/Onfire7/request-parser)

An extremely simple node.js http request parser.

Request Parser was born out of my frustration of having to choose
between a huge middleware library and parsing POST requests myself.

## Note
Request-Parser is still in an early alpha.
It doesn't yet handle multipart uploads.
It is also very likely to break, and bug reports and commits are very welcome.

## Goals
* Super simple
* Minimalist
* One call
* Router agnostic

## Example
```javascript
var parse = require('request-parser');

// Wrap your route callback
parse(function(req, res){
	
	// Your callback will be wraped with a parser function.
	// It will be called once any post data is finished parsing.
	
	req.get
	req.post
	
	// Do Stuff
	
});
```

## License
[The MIT License](http://www.opensource.org/licenses/mit-license.php).
