// google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(function() {
  // $("#home_button").on("click", "a", initMap);
  $("#manually_enter").on("submit", getDirections);
});

function getDirections(event) {
  event.preventDefault();
  initialize();
};


// 'driver code', runs at top level
var center = new google.maps.LatLng(37.784580, -122.397437);
var map = new google.maps.Map(document.getElementById('map'), {
   center: center,
   zoom: 11,
   mapTypeId: google.maps.MapTypeId.ROADMAP
});


var infowindow = new google.maps.InfoWindow({
  map: map
});

var bounds = new google.maps.LatLngBounds();


// start coordinates
// var start = ['55.46242, 8.43872']
var start = ["Montgomery St. Station 94104"];

// end coordinates
// var end = ['51.94784, 1.2539']
var end = ["Macarthur Station 94609"];




// from JSFiddle

function initialize() {
    for (var i=0; i < end.length; i++){
      calcRoute(start[i], end [i]);
    }
};


function calcRoute(source,destination){

  var polyline = new google.maps.Polyline({
     path: [],
     strokeColor: '#FF0000',
     strokeWeight: 5,
     strokeOpacity: 0.5
  });

  var directionsService = new google.maps.DirectionsService();
  var request = {
     origin:source,
     destination: destination,
     travelMode: google.maps.DirectionsTravelMode.TRANSIT
  };

  directionsService.route(request, function(result, status) {
     if (status == google.maps.DirectionsStatus.OK) {
        path = result.routes[0].overview_path;
        debugger
         $(path).each(function(index, item) {
            polyline.getPath().push(item);
            bounds.extend(item);
         });

        polyline.setMap(map);
        map.fitBounds(bounds);

        // Custom infoWindow
        var toolTip = '<div id="map-box">'+
         '<div id="siteNotice">'+
         '</div>'+
         '<h1 id="firstHeading" class="firstHeading">Ferry Route</h1>'+
         '<div id="bodyContent">'+
         '<p>Lorem ipsum dolor sit amet</p>'+
         '</div>'+
         '</div>';

        google.maps.event.addListener(polyline, 'click', function(event) {
            infowindow.setContent(toolTip);
            infowindow.setPosition(event.latLng);
            infowindow.open(map);
        });
    };
  });
};






// // mine
// function centerOfBounds(bounds) {
//   var latCenter = ((bounds.northeast.lat + bounds.southwest.lat)/2);
//   var lngCenter = ((bounds.northeast.lng + bounds.southwest.lng)/2);
//   var center = {
//     lat: latCenter,
//     lng: lngCenter
//   };
//   return center;
// };

// function stringifyLocation(location) {
//   var output = "";
//   output += location.lat;
//   output += ", ";
//   output += location.lng;
//   return output;
// };


// // from Ben, kinda
// function initMap(event) {
//   event.preventDefault();
//   var map;
//   var myLatLng = {lat: 37.784580, lng: -122.397437};
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: myLatLng,
//     zoom: 11,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
// };








// stuff from Ben G's initMap, commented out

// var marker;

// marker = new google.maps.Marker({
//   position: myLatLng,
//   map: map,
//   title: 'Drag Me!',
//   draggable: true
// });

// google.maps.event.addListener(marker, 'dragend', function (event) {
//   var lat = event.latLng.lat();
//   var long = event.latLng.lng();
//   var latlng = {lat: lat, lng: long};
// });





// Not using

// function getDirections(event) {
  // event.preventDefault();
  // directionsRequest = $(this).serialize();
  // debugger

  // test data
  // origin = "Montgomery+St.+Station+94104";
  // destination = "Macarthur+Station+94609";
  // calcRoute(origin, destination);

  // var ajaxRequest = $.ajax({
  //   type: "POST",
  //   url: "/directions",
  //   data: directionsRequest
  // });
  // ajaxRequest.done(function(directionsObject){
  //   displayJSONonMap(directionsObject);
  // });
// };



// function displayJSONonMap(directionsObject){
//   console.log('success!');
//   var status = directionsObject.status;
//   var waypoints = directionsObject.geocoded_waypoints;
//   var routes = directionsObject.routes;

//   var myBounds = routes[0].bounds;
//   var myCenter = centerOfBounds(myBounds);
//   var myStartLoc = routes[0].legs[0].start_location;
//   var myEndLoc = routes[0].legs[0].end_location;

//   var myStartString = stringifyLocation(myStartLoc);
//   var myEndString = stringifyLocation(myEndLoc);

//   debugger;

//   // ========================================================
//   // recreate JSFiddle 'driver code' with my data

//   // var bounds = myBounds;
//   var bounds = new google.maps.LatLngBounds();
//   // debugger

//   var center = new google.maps.LatLng(myCenter);
//   var map = new google.maps.Map(document.getElementById('map'), {
//      center: myCenter,
//      zoom: 12
//   })

//   var infowindow = new google.maps.InfoWindow({
//     map: map
//   })

//   // this!  do for as many polylines as I want to add
//   calcRoute(myStartString, myEndString);
//   // ========================================================

// };

