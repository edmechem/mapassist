$(document).ready(function() {
  $("#home_button").on("click", "a", initMap);
  $("#manually_enter").on("submit", getDirections);
});

function initMap(event) {
  event.preventDefault();
  var map;
  var myLatLng = {lat: 37.784580, lng: -122.397437};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
};

function getDirections(event) {
  event.preventDefault();
  directionsRequest = $(this).serialize();
  var ajaxRequest = $.ajax({
    type: "POST",
    url: "/directions",
    data: directionsRequest
  });
  ajaxRequest.done(function(directionsObject){
    displayJSONonMap(directionsObject);
  });
};

function displayJSONonMap(directionsObject){
  console.log('success!');
  var status = directionsObject.status;
  var waypoints = directionsObject.geocoded_waypoints;
  var routes = directionsObject.routes;
  // debugger

  var myBounds = routes[0].bounds;
  var myCenter = centerOfBounds(myBounds);

  // debugger;

  var map;

  // var myLatLng = {lat: 37.784580, lng: -122.397437};
  // var center = new google.maps.LatLng(myLatLng)
  var map = new google.maps.Map(document.getElementById('map'), {
     center: myCenter,
     zoom: 12
  })

  // var bounds = new google.maps.LatLngBounds();

};


function centerOfBounds(bounds) {
  var latCenter = ((bounds.northeast.lat + bounds.southwest.lat)/2);
  var lngCenter = ((bounds.northeast.lng + bounds.southwest.lng)/2);
  var center = {
    lat: latCenter,
    lng: lngCenter
  };
  return center;
};

















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
