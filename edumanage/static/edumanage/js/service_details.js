

$(document).ready(function() {
    var map = '';
    var lat = $('#js-lat').data('lat');
    // "{{service.latitude}}";
    // var lat = document.getElementById("js-lat");
    console.log(lat);
    var lat = parseFloat(lat.replace(",","."));
    var lng = $('#js-lng').data('lng');
    var lng = parseFloat(lng.replace(",","."));
    var pin = $('#js-pin').data('pin');
    var latlng = new google.maps.LatLng(lat,lng);
    var zoomLevel = 16;

    initialize();


});


function initialize() {

    image = new google.maps.MarkerImage(pin,
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
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        'position' : latlng,
        'map' : map,
        'icon': image,
        });

    }

