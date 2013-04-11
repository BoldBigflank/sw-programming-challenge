var request = require('request')
var host = "http://swoop.startupweekend.org/events"; //?since=2013-01-01&until=2013-01-31&region=USA%20West"
var _ = require('underscore')

exports.events = function(options, fn){
	var now = new Date();
	var today = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
	var pastMonth = new Date();
	pastMonth.setDate(pastMonth.getDate()-30);
	var oneMonthAgo = pastMonth.getFullYear() + "-" + (pastMonth.getMonth()+1) + "-" + pastMonth.getDate();
	var pastUrl = host + "?event_status=G&until=" + today + "&since=" + oneMonthAgo
	console.log(pastUrl)
	var data = {}
	request(pastUrl, function(error, response, body){
		var past = JSON.parse(body)
		data.past = past

		now.setDate(now.getDate()+1)
		var tomorrow = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();

		upcomingUrl = host + "?event_status=G&since=" + tomorrow
		console.log(upcomingUrl)
		request(upcomingUrl, function(error, response, body){
			var upcoming = JSON.parse(body)
			data.upcoming = upcoming
			fn(data)
		})
	})
	
}

exports.event = function(id, fn){
	request(host + "/" + id, function(error, response, body){
		var event = JSON.parse(body)
		console.log(event)
		fn(event)
	})
}