var request = require('request')
var host = "http://swoop.startupweekend.org/events?since=2013-01-01&until=2013-01-31&region=USA%20West"
var _ = require('underscore')

exports.events = function(options, fn){
	request(host, function(error, response, body){
		var events = JSON.parse(body)
		fn({events: events})
	})
	
}