$(function(){

	function showResult(result) {
		var lat = result.geometry.location.lat();

		$('#latitude').html(lat);
	    $('#longitude').html(result.geometry.location.lng());
	}

	function getLatitudeLongitude(callback, address) {
	
		address = address || 'Wembley, London, UnitedKingdom';
		// Initialize the Geocoder
		geocoder = new google.maps.Geocoder();
		    if (geocoder) {
		    geocoder.geocode({
		        'address': address

		    }, function (results, status) {
		        if (status == google.maps.GeocoderStatus.OK) {
		            callback(results[0]);
		        	}
		    	});
			}
	}
	
	$("#btn-get-long-lat").click(function(){
			var address = document.getElementById('address').value;

			getLatitudeLongitude(showResult, address);

		});
 	});

function initMap() {
        var uluru = {lat: 51.41697749999999, lng: -0.1560859999999593};
        var map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 10,
	        center: uluru
        });
        var marker = new google.maps.Marker({
	        position: uluru,
	        map: map
        });
}


window.Instagram = {
	config : {},

	LOCATION_URL : 'https://api.instagram.com/v1/locations/search?lat=51.461311&lng=-0.303742&access_token=',

	USER_PROFILE_URL : 'https://api.instagram.com/v1/users/self/media/recent/?access_token=',

	init: function(option) {
		option = option || {};
		this.config.access_token = option.access_token; 
	},

	userProfile: function(callback){
		var endpoint = this.USER_PROFILE_URL + this.config.access_token;
		this.getJSON( endpoint, callback);
	},

	location: function(callback){
		var endpoint = this.LOCATION_URL + this.config.access_token;
		this.getJSON( endpoint, callback);
	},

	getJSON: function(url,callback){
		$.ajax({
			type: 'GET',
			url: url,
			dataType : 'jsonp',
			success: function(response){
				if( typeof callback === 'function' ) callback (response);
			}

		});
	}

};

Instagram.init({

	access_token : ACCESS_TOKEN_INSTAGRAM //Please enter the access token from instragram API and replace ACCESS_TOKEN_INSTAGRAM
	
});


$(document).ready(function(){

		Instagram.userProfile(function(response){
	var instagram = $('#instagram');
	for (var i = 0; i < response.data.length; i++) {
		imageUrl = response.data[i].images.low_resolution.url;
		instagram.append('<img src="' + imageUrl+ '" />' );
	}
	});

	Instagram.location(function(response){
	var location = $('#places');
	for (var i = 0; i < response.data.length; i++) {
		places = response.data[i].name;
		location.append('<h2>' + places + '</h2>' );
	}
	});
});


