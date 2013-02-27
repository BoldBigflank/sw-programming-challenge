var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
// app.set('controllers', __dirname + '/controllers');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	var swapi = require('./controllers/swapi')
	swapi.events({}, function(data){
		res.status(200)
  		res.render('index.jade', {events: data.events})
	})
});


// Get twitter info from the specified hashtag
app.post('/hashtag', function(req, res){
	res.send(200)
})

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');