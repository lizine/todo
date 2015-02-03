//server.js


var express = require('express');
var app     = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration --------


mongoose.connect('mongodb://lizine:node@proximus.modulusmongo.net:27017/piraPa9w'); //connect to mongodb database

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

//define model

var Todo = mongoose.model('Todo', {
text : String

});

//listen to port 8080

app.listen(8080);
console.log("listening on port 8080");

//routes

// RESTful api
//get all todos
app.get('/api/todos', function(req, res){

  //use mongoose to get todos from the database
  Todo.find(function(err, todos){
        
       if (err)
    	  res.send(err)

    
       res.json(todos); //return all todos in JSON
 

  	});

});

//create todo

app.post('/api/todos', function(req,res){

	Todo.create({

		text: req.body.text,
		done: false
	}, function(err,todo){
         if (err)
        	res.send(err)

         //get and return all todos after creating a new one
         Todo.find(function(err,todos){
         	if (err)
         		res.send(err)
         	res.json(todos);

         });


	});
});

//delete a todo

app.delete('/app/todos:todo_id', function(req,res){

	 Todo.remove({
		_id : req.params.todo_id

     }, function(err,todo){
		  if (err)
			res.send(err);

		 //get and return todos after deleting
		Todo.find(function(err,todos){

			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});


