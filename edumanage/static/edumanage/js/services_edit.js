
function gettext(msgid) { return msgid; }

	var lat = $("#map_canvas").data("mapcenter0");
	var lat = parseFloat(lat.toString().replace(",","."));
	var lng = $("#map_canvas").data("mapcenter1");
	var lng = parseFloat(lng.toString().replace(",","."));
	var formdlat = $("#map_canvas").data("formdlat");
	var formilat = $("#map_canvas").data("formilat");
	var formdlon = $("#map_canvas").data("formdlon");
	var formilon = $("#map_canvas").data("formilon");

	var edupin = $("#map_canvas").data("edupin");
	var adduser = $("#map_canvas").data("urladduser");
	var urlsform = $("#map_canvas").data("urlsform");
	var servicesform = $("#map_canvas").data("servicesform");


	var zoomLevel = 6;
	if( formdlat || formilat){
		if(formdlat)
			var lat = formdlat;
		else if(formilat)
			var lat = formilat;
		var lat = parseFloat(lat.toString().replace(",","."));
	}
	if( formdlon || formilon){
		if(formdlon)
			var lng = formdlon;
		else if(formilon)
			var lng = formilon;
		var lng = parseFloat(lng.toString().replace(",","."));
		var zoomLevel = 14;
		getOnce = true;
	}
var latlng = new google.maps.LatLng(lat,lng);
var map = '';
var marker = '';
var getOnce = false;

function setPositionValues(position) {
	$("#id_longitude").val('');
	$("#id_latitude").val('');
	$("#id_address_street").val('');
	$("#id_address_city").val('');
	pos_lng = new Number(position.lng().toPrecision(11)).toFixed(8);
	pos_lat = new Number(position.lat().toPrecision(11)).toFixed(8);
	$("#id_longitude").val(pos_lng);
	$("#id_latitude").val(pos_lat);
	codeLatLng(position);
}

function getPosition(position) {
	latlng = new google.maps.LatLng(position.coords.latitude,
			position.coords.longitude);
	getOnce = true;
	map.setCenter(latlng);
	map.setZoom(15);
	marker.setPosition(latlng);
	setPositionValues(latlng);
}

function moveMarker(position) {
	marker.setPosition(position);
	setPositionValues(position);
}

function geocode(position){
	geocoder
	.geocode(
			{
				'latLng' : position
			},
			function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results.length >= 1) {
						for ( var ii = 0; ii < results[0].address_components.length; ii++) {
							var street_number = route = street = city = state = zipcode = country = formatted_address = '';
							var types = results[0].address_components[ii].types
									.join(",");
							if (types == "street_number") {
								addr.street_number = results[0].address_components[ii].long_name;
							}
							if (types == "route"
									|| types == "point_of_interest,establishment") {
								addr.route = results[0].address_components[ii].long_name;
							}
							if (types == "sublocality,political"
									|| types == "locality,political"
									|| types == "neighborhood,political"
									|| types == "political") {
								addr.city = (city == '' || types == "locality,political") ? results[0].address_components[ii].long_name
										: city;
							}
							if (types == "administrative_area_level_1,political") {
								addr.state = results[0].address_components[ii].short_name;
							}
							if (types == "postal_code"
									|| types == "postal_code_prefix,postal_code") {
								addr.zipcode = results[0].address_components[ii].long_name;
							}
							if (types == "country,political") {
								addr.country = results[0].address_components[ii].long_name;
							}
						}
					}

					if (addr.route && addr.city) {
						addr_field = addr.route;
						if (addr.street_number) {
							addr_field = addr.route + " "
									+ addr.street_number;
						}
						$("#id_address_street").val(addr_field);
						city_field = addr.city;
						if (addr.zipcode) {
							city_field = addr.city + ", "
									+ addr.zipcode;
						}
						$("#id_address_city").val(city_field);
					}
				}
			});
}

function codeLatLng(position) {
	addr = {};
	latlng = position;
	addr_num = '';
	addr_name = '';
	addr_city = '';
	addr_code = '';
	geocode(position)
}
function initialize() {
	image = new google.maps.MarkerImage(edupin,
			// This marker is 29 pixels wide by 40 pixels tall.
			new google.maps.Size(29, 40),
			// The origin for this image is 0,0.
			new google.maps.Point(0,0),
			// The anchor for this image is the base of the flagpole at 18,42.
			new google.maps.Point(14, 40)
		);
	var styleArray = [
	                   {
	                       featureType: "all",
	                       stylers: [
	                         { saturation: -60 },
	                         {gamma: 1.00 }
	                       ]
	                     },{
	                       featureType: "poi.business",
	                       elementType: "labels",
	                       stylers: [
	                         { visibility: "off" }
	                       ]
	                     },
	                     { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] },
	                     { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] },
	                     {'featureType': "administrative.country",
	                     'elementType': "labels",
	                     'stylers': [
	                         { 'visibility': "off" }
	                     ]}


	                   ];
	geocoder = new google.maps.Geocoder();
	var mapOptions = {
		center : latlng,
		zoom : zoomLevel,
		styles: styleArray,
		 mapTypeId: google.maps.MapTypeId.ROADMAP,
		    mapTypeControlOptions: {
			      style: google.maps.MapTypeControlStyle.DEFAULT
			    },
			navigationControl: true,
			mapTypeControl: false,
	};



	map = new google.maps.Map(document.getElementById("map_canvas"),
			mapOptions);

	var input = document.getElementById('searchbox');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

	if (getOnce == false) {
		marker = new google.maps.Marker({
			position : latlng,
			draggable : true,
			'icon': image,
			animation : google.maps.Animation.DROP,

		});
		marker.setMap(map);
		if(!formilat)
			setPositionValues(latlng);
	}
	google.maps.event.addListener(map, 'idle', function() {

	if( !formdlat)
		if( !formilat)
			if (navigator.geolocation && getOnce == false) {
				navigator.geolocation.getCurrentPosition(getPosition);
			}
	});

	google.maps.event.addListener(map, 'click', function(event) {
		moveMarker(event.latLng);
	});
	google.maps.event.addListener(marker, 'dragend', function(event) {
		setPositionValues(marker.getPosition());
	});

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		var place = autocomplete.getPlace();
		if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
		getOnce == true;
		moveMarker(place.geometry.location);
	});

}

$(document).ready(function() {

	initialize();

	$("div.controls > ul").addClass('unstyled');

	$("#updatemap").click(function(){
		latlng = new google.maps.LatLng($("#id_latitude").val(), $("#id_longitude").val());
		moveMarker(latlng);
		map.setCenter(latlng);
		$("#updatemap").addClass('disabled');
		$("#updatemap").attr('disabled', 'disabled');
		return false;
	});

	$("#myloc").click(function(){
		navigator.geolocation.getCurrentPosition(getPosition);
		return false;
	});

	$("#id_latitude").keypress(function(){
		$("#updatemap").removeClass('disabled');
		$("#updatemap").removeAttr('disabled');
	});
	$("#id_longitude").keypress(function(){
		$("#updatemap").removeClass('disabled');
		$("#updatemap").removeAttr('disabled');
	});

	// Initialize jquery formset

	 $('#urlsform tbody tr').formset({
        prefix: urlsform,
        formCssClass: "dynamic-formset1",
        added: addButton,
    });

	 $('#locsform tbody tr').formset({
            prefix: servicesform,
            formCssClass: "dynamic-formset2",
            added: addButton
        });

	 $(".delete-row").prepend('<i class="icon-remove-sign icon-white"></i> ').addClass('btn btn-small btn-warning');
	 $(".add-row").prepend('<i class="icon-plus-sign icon-white"></i> ').addClass('btn btn-small btn-info');

	 $("#adduserSubmit").click(function(){
			$.ajax({
				url:adduser,
				data:$("#add_user_form").serialize(),
				type: "POST",
				cache: false,
				success:function(data){
						try {
							value = data.value;
							text = data.text;
							if (typeof value === 'undefined' && typeof text === 'undefined'){
								$('#mymodalbody').html(data);
							}
							else{
								$('#id_contact').append($("<option></option>").attr("value",value).text(text));
								$('#myModal').modal('hide')
							}
						}
						catch (exception) {
							$('#mymodalbody').html(data);
						}
					}
					});
			return false;
		});

	 $("#add_contact").click(function(){
		 $('#myModal').modal('show')
		 $.ajax({
				url:adduser,
				type: "GET",
				success: function(data){
					$('#mymodalbody').html(data);
					}
				});

		 return false;
	 });

});
function addButton(row){
	$(row).find(".delete-row").prepend('<i class="icon-remove-sign icon-white"></i> ').addClass('btn btn-small btn-warning');
}


