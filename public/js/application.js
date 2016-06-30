// google.maps.event.addDomListener(window, 'load', initialize);
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


function getDirections() {
  event.preventDefault();
  directionsRequest = $(this).serialize();
  directionsHash = directionsHashifier(directionsRequest);

  var startLocs = [
    directionsHash.start_loc,
    directionsHash.start_station,
    directionsHash.dest_station
  ];

  var modes = [
    directionsHash.start_mode,
    "TRANSIT",
    directionsHash.dest_mode
  ];

  var endLocs = [
    directionsHash.start_station,
    directionsHash.dest_station,
    directionsHash.dest_loc
  ];


  // redo the 'driver code each time'
  center = new google.maps.LatLng(37.784580, -122.397437);
  map = new google.maps.Map(document.getElementById('map'), {
     center: center,
     zoom: 11,
     mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  infowindow = new google.maps.InfoWindow({
    map: map
  });

  bounds = new google.maps.LatLngBounds();

  initialize(startLocs, modes, endLocs);
};

function directionsHashifier(directionsRequest) {
  var output = {};
  var paramPairs = directionsRequest.split("&");
  for (var i = 0; i < paramPairs.length; i++) {
    var splitPair = paramPairs[i].split("=");
    output[splitPair[0]] = splitPair[1];
  };
  return output;
};





// 'driver code', runs at top level
// var center = new google.maps.LatLng(37.784580, -122.397437);
// var map = new google.maps.Map(document.getElementById('map'), {
//    center: center,
//    zoom: 11,
//    mapTypeId: google.maps.MapTypeId.ROADMAP
// });

// var infowindow = new google.maps.InfoWindow({
//   map: map
// });

// var bounds = new google.maps.LatLngBounds();




// from JSFiddle

function initialize(startLocs, modes, endLocs) {
    for (var i=0; i < startLocs.length; i++){
      calcRoute(startLocs[i], modes[i], endLocs [i]);
      // debugger;
    }
};


function calcRoute(source, mode, destination){

  if (mode === "BICYCLING") {
    var strokeColor = '#FF0000' // red
    // var strokeColor = '#FFFF00' // yellow
    // var strokeColor = '#00FF00' // green
  } else if (mode === "TRANSIT") {
    var strokeColor = '#0000FF' // blue
  } else if (mode === "WALKING") {
    var strokeColor = '#008800' // green
  } else if (mode === "DRIVING") {
    var strokeColor = '#FFFF00' // yellow
  };


  var polyline = new google.maps.Polyline({
     path: [],
     strokeColor: strokeColor,
     strokeWeight: 6,
     strokeOpacity: 0.7
  });

  var directionsService = new google.maps.DirectionsService();

  request = {
     origin: source,
     destination: destination,
     travelMode: google.maps.DirectionsTravelMode[mode]
  };
  // debugger;

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var path = result.routes[0].overview_path;
      var route = result.routes[0];

      // debugger



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


