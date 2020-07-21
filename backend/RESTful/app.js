var express		   		 =  require("express") ;
var app 	       		 =  express() ; 
var expressSanitizer	 =  require("express-sanitizer") ;
var request 	   		 =  require("request") ;

var methodOverride       =  require("method-override");
var bodyParser           =  require("body-parser") ;

var mongoose             =  require("mongoose") ; 

// APP CONFIG

mongoose.connect("mongodb://localhost:27017/blogApp", { useNewParser: true } ) ;

app.set("view engine", "ejs") ;
app.use ( express.static("public") ) ; 

app.use( bodyParser.urlencoded( { extended: true } ) ) ;
app.use(expressSanitizer()) ;


app.use(methodOverride("_method")) ;// look for _method in the URL. 

var blogSchema = new mongoose.Schema({
	title: String,
	image: String, // can also specify some default image if the user doesn't input an image; like we did in created field. 
	body: String,
	created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema) ; 
// First argument has to be singular name of the collection that will be created. 

// RESTFUL Routes. 

app.get("/", function(req, res) {
	res.redirect("/blogs") ;
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
	
	// find in the database
	Blog.find( {} , function(err, blogs) { // find everything because we pass in an empty object. 
		
		if ( err ) {
			console.log("ERROR!") ; 
		} else {
			res.render("index", { allBlogs : blogs } ) ;
		}
		
	}) ;
	
}) ; 

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new"); 
}) ; 


// CREATE ROUTE: Form data filled from new.ejs comes here. 

app.post ("/blogs", function(req, res){
	// create blog and then redirect to index. 
	
	req.body.blog.body = req.sanitize(req.body.blog.body) ; 
	// remove <script> tags from body. 
	
	// req.body.blog gets filled in the form.  
	Blog.create( req.body.blog, function(err, newBlog) {
		if ( err ){
			res.render("new") ;  // why are we rendering new.ejs again ? 
		} else { // redirect to /blogs. 
			res.redirect("/blogs") ; 
		}
	}) ;
	
});

// SHOW ROUTE

app.get("/blogs/:id", function(req, res) {
	
	Blog.findById(req.params.id , function(err, foundBlog ) {
		
		if(err){ 
			res.redirect("/blogs"); // Can improve error handling. 
		} else {
			res.render("show", { blog: foundBlog }) ;
		}
		
	}) ;

});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
	
	Blog.findById( req.params.id, function(err, foundBlog){
		if ( err ) {
			res.redirect("/blogs") ;
		} else {
			res.render("edit", { blog: foundBlog } ) ; 
		}
	});
	
}) ; 

// UPDATE ROUTE
app.put("/blogs/:id" , function(req, res) { 
	
	req.body.blog.body = req.sanitize(req.body.blog.body) ; 
	
	// find the existing blog and update it with new data. req.body.blog has the new data now. 
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog ) { 
		if(err) {
			res.redirect("/blogs") ; 
		} else {
			res.redirect("/blogs/" + req.params.id ) ;  
		}
	}) ; 
	
	// When we submit the form in edit.ejs a PUT request is made, to /blogs/:id and it further 
	// redirects to SHOW route. 
	
}) ;


app.delete("/blogs/:id", function(req, res) {

	// Destroy blog and redirect somewhere. 
	Blog.findByIdAndRemove( req.params.id, function(err) { 
		
		if(err) {
			res.redirect("/blogs"); 
		} else {
			res.redirect("/blogs"); 
		}
		
	} ) ;

}) ;

// We can also make a get request instead and in the route we can write "/blogs/:id/delete"
// But we are following REST convention. 


app.listen(3000, function() {
	console.log("Yelpcamp server started") ; 
}) ;

