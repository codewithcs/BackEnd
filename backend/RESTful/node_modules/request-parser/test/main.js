var should = require('should');
var parse = require('../index');


var testRequestGET = {
  socket: { },
  connection: { },
  httpVersion: '1.1',
  complete: false,
  headers:
    {
      host: 'localhost:8080',
      connection: 'keep-alive',
      'cache-control': 'max-age=0',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) ...',
      accept: 'application/xml,application/xhtml+xml ...',
      'accept-encoding': 'gzip,deflate,sdch',
      'accept-language': 'en-US,en;q=0.8',
      'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'
     },
  trailers: {},
  readable: true,
  url: '/folder?test=pass',
  method: 'GET',
  statusCode: null,
  client:  { },
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  upgrade: false
}

var testRequestPOST = { // TODO add proper test for POST requests.
    type: "req",
    url: 'http://test.com/folder?test=pass'
}

var testResponse = {
    type: "res"
}


describe('parse()', function() {
    describe('testing that GET', function() {
        it('sets the get var correctly', function(done) {
            
            // Create a callback to hand to the router.
            var func = parse(function(req, res){
                
                // Ensure that the response hasn't been changed.
                res.should.eql(testResponse);
                
                // Ensure that information that was in the request before hasn't been lost.
                req.should.have.properties(Object.keys(testRequestGET));
                
                // Ensure that the GET variables are here.
                req.get.test.should.eql('pass');
                
                // Signal that the test is complete.
                done();
                
            });
            
            // Simulate a request.
            func(testRequestGET, testResponse);
        });
    });
    
   /* describe('testing that POST', function() {
        it('sets the post var correctly', function(done) {
            
            // Create a callback to hand to the router.
            var func = parse(function(req, res){
                
                // Ensure that the response hasn't been changed.
                res.should.eql(testResponse);
                
                // Ensure that information that was in the request before hasn't been lost.
                req.should.have.properties(Object.keys(testRequestPOST));
                
                // Ensure that the POST variables are here.
                req.post.test.should.eql('pass');
                
                // Signal that the test is complete.
                done();
                
            });
            
            // Simulate a request.
            func(testRequestPOST, testResponse);
        });
    });*/
});