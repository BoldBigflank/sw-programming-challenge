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
		$.post('/city', {city: $(link).html()}, function(data){

			var lat = $(link).find("input[name='lat']").val()
			var lng = $(link).find("input[name='lng']").val()
			
			// Update the map location
			map.setCenterAnimate(new MQA.LatLng(lat,lng),5,{totalMs:1500,steps:200})
		})
		return false
	})

})