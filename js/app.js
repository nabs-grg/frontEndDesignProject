$(function(){

	function showResult(result) {
		$('#latitude').html(result.geometry.location.lat());
	    $('#longitude').html(result.geometry.location.lng());
	}

	function getLatitudeLongitude(callback, address) {
	// If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
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

	//$("#btn-search-location").click(function(event){
		    
    // var userData = "https://maps.googleapis.com/maps/api/geocode/json?address="+$('input#search-location').val();

    // $.ajax({
    //   type: "POST",
    //     url : userData, 
    //     success: function(data){
    //         $.each(data['results'][0]['address_components'], function(key, value) {
    //                 $('.alert-success').fadeIn(2000).html('Post/ZIP Code: '+value["long_name"]);
    //         });
    //     }
    // });
 //    function getLocationCoordinate(address) {
 	
 //    var position = {};
 //    $.ajax({
 //    	type: "GET",
 //    	url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDLs4U71ZFRTyBO-1VBGN-msCBZ6TP8zUQ",
 //        data : {
 //            address : address,
 //            sensor : false
 //        },
 //        async : false,
 //        success : function(result) {
 
 //            try {
 //                position.lat = result.results[0].geometry.location.lat;
 //                position.lng = result.results[0].geometry.location.lng;
 //            } catch(err) {
 //                position = null;
 //            }
 
 //        }
 //    });

 //    return position;

	// }


	$.ajax({
		type : "GET",
		url : "https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=4133106260.0d61703.f761dd008fd14de6b6168ffbb30ba549",
		dataType : "jsonp",
		success: function(result){
        	$("#div1").html(result);
    	},
    	error: function(result){
		console.log(result); // send the error notifications to console
		}
	});
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

	BASE_URL : 'https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=',

	init: function(option) {
		option = option || {};
		this.config.access_token = option.access_token; 
	},

	// popular : function(callback){
	// 	var endpoint = this.BASE_URL + '/media/recent?access_token=' + this.config.access_token;
	// 	this.getJSON( endpoint, callback);
	// },

	// tagsByName: function(name,callback){
	// 	var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?access_token=' + this.config.access_token;
	// 	this.getJSON( endpoint, callback);
	// },

	location: function(callback){
		var endpoint = this.BASE_URL + this.config.access_token;
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
	access_token : '4133106260.0d61703.f761dd008fd14de6b6168ffbb30ba549'
});


$(document).ready(function(){
	
	Instagram.location(function(response){
	var $instagram = $('#instagram');
	for (var i = 0; i < response.data.length; i++) {
		name = response.data[i].name;
		$instagram.append('<h2>' + name + '</h2>' );
	}
	});
});

//514276

/*  
	INSTAGRAM EXAMPLE
*/



/*
document.getElementById('latitude').html= result.geometry.location.lat();
	    document.getElementById('longitude').innerHTML = result.geometry.location.lng();

*/

