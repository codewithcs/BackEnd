var url = require('url');
var qs = require('querystring');

function Parse (func) {
	return function(req, res){
		
		// Handle GET variables
		var parts = url.parse(req.url,true);
		if (parts.query) req.get = parts.query;
		
		
		// Handle POST variables
		if (req.method === 'POST') {
			
			req.postData = "";
			
			req.on('data', function(data){
				req.postData += data;
				
				// Check data size
				if (req.postData.length > 1e7) { // 10MB limit
					req.postData = '';
					response.writeHead(413, {'Content-Type': 'text/plain'}).end();
					request.connection.destroy();
				}
			});
			
			req.on('end', function(){
				// If not posted as binary data
				if (req.headers['content-type'].toLowerCase()  !== 'multipart/form-data' ) {
					req.post = qs.parse(req.postData);
					func(req, res);
				}else{
					// TODO add binary support... Possiblly with poor-form
				}
			});
		}else{
			func(req, res);
		}
	};
};



module.exports = Parse;