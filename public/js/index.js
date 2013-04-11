$(function(){
	// MapQuest initiation
	MQA.EventUtil.observe(window, 'load', function() {

		/*Create an object for options*/ 
		var options={
			elt:document.getElementById('map'),       /*ID of element on the page where you want the map added*/ 
			zoom:5,                                  /*initial zoom level of the map*/ 
			latLng:{lat:39.743943, lng:-105.020089},  /*center of map in latitude/longitude */ 
			mtype:'map',                              /*map type (map)*/ 
			bestFitMargin:0,                          /*margin offset from the map viewport when applying a bestfit on shapes*/ 
			zoomOnDoubleClick:true                    /*zoom in when double-clicking on map*/ 
		};

		/*Construct an instance of MQA.TileMap with the options object*/ 
		window.map = new MQA.TileMap(options);
	})


	// When a city is selected
	$("a.cityLink").click(function(event){
		var link = this
		$("li.cityListItem").removeClass('active')
		$(link).parent().addClass('active')
		var id = $(link).find("input[name='id']").val()
		$("#details #loading").show()
		$("#details #content").hide()
		$("#details").hide().slideDown()
		if($("#mapWell").is(':hidden'))
			$("#cityList").slideUp()
		$.get('/event?id=' + id, function(data){
			// Populate/show the details
			
			$("#details #name").html(data.event_type)
			$("#details #location").html(data.city + ", " + (data.state ? data.state : data.country) )
			$("#details #date").html(data.start_date.substr(0,10))
			$("#details #hashtag").html(data.twitter_hashtag)
			$("#details #website").html('<a href="http://' + data.website + '">' + data.website + "</a>");
			
			$("#details #loading").hide()
			$("#details #content").show()

			
			// Move the map
			var lat = data.location.lat
			var lng = data.location.lng
			// Update the map location

			/*Using the MQA.Poi constructor*/ 
			var info=new MQA.Poi({lat:lat, lng:lng});

			/*Sets the rollover content of the POI.*/ 
			// info.setRolloverContent('Sports Authority Field at Mile High');

			/*Sets the InfoWindow contents for the POI. By default, when the POI receives a mouseclick 
			event, the InfoWindow will be displayed with the HTML passed in to MQA.POI.setInfoContentHTML method.*/ 
			var contentHTML = "<a href='http://" + data.website +"'>" + data.website + "</a>"
			info.setInfoContentHTML(contentHTML);

			/*This will add the POI to the map in the map's default shape collection.*/ 
			map.addShape(info);

			map.setCenterAnimate(new MQA.LatLng(lat,lng),7,{totalMs:1500,steps:200})

			
		})
		return false
	})


	// Bootstrap tabs
	$('#upcomingTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
	$('#pastTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})

	$("#phoneReturn").click(function(e){
		$("#cityList").show()
		$("#details").hide()
		return false;
	})

})