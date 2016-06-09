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
    zoom: 11
  });
};


function getDirections(event) {
  event.preventDefault();
  directionsRequest = $(this).serialize();

  var queryURL = 'https://maps.googleapis.com/maps/api/directions/json?' + directionsRequest;

  var ajaxRequest = $.ajax({
    method: "GET",
    url: "/directions",
    data: queryURL
  });

  ajaxRequest.done(function(directionsObject){
    console.log("success!");
  });
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
