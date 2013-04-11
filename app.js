var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
// app.set('controllers', __dirname + '/controllers');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	var swapi = require('./controllers/swapi')
	swapi.events({}, function(data){
		res.status(200)
  		res.render('index.jade', data)
	})
});

app.get('/api/events', function(req, res){
	var swapi = require('./controllers/swapi')
	swapi.events({}, function(data){
		res.status(200)
  		res.send(data)
	})
})


app.get('/event', function(req, res){
	var swapi = require('./controllers/swapi')
	console.log(req.query)
	swapi.event(req.query.id, function(data){
		res.status(200)
		res.send(data)
	})
})

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');