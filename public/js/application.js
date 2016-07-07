$(document).ready(function() {
  initMap();
  $("#home_button").on("click", "a", initMap);
  $("#manually_enter").on("submit", getDirections);
});

function initMap() {
  // google.maps.controlStyle = 'azteca' // allow 'old-style' Pan Controls w/ new map; thru Aug '16
  // var map;
  myLatLng = {lat: 37.784580, lng: -122.397437};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 11,
    fullscreenControl: false,
    // panControl: true, // doesn't work even with 'azteca' - forget about it
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(37.784580, -122.397437),
    new google.maps.LatLng(37.784580, -122.397437)
  );
  var options = { bounds: defaultBounds };

  var input = document.getElementById('pac-input');
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); // if I wanted it to show *on* the map
  var autocomplete = new google.maps.places.Autocomplete(input,options);
  autocomplete.bindTo('bounds', map);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    // console.log("place: " + JSON.stringify(place) );

    var placeId = place.place_id;
    var placeID = placeId;

    var placeURL = place.url;

    if (place.name != null) { var placeName = place.name } else {
      var placeName = "" }

    // build up meaningful address if it's vague
    if (place.formatted_address != "United States") {
      var placeAddr = place.formatted_address;
    } else {
      var placeAddr = placeName + ', ' +
        place.address_components[2].long_name + ', ' +   // city
        place.address_components[4].short_name + ' ' +   // state
        place.address_components[5].long_name            // zip
    }

    var placeLatLng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }

    if (place.website != null) { var placeWebsite = place.website } else {
      var placeWebsite = "" }

    var bodyContent = constructBodyContent(placeAddr, placeURL, placeWebsite)
    var infoWindowContent = constructInfoWindowContent(placeName, bodyContent)

    // debugger;

    setMarker(placeLatLng, infoWindowContent)



  })


};


function constructBodyContent(placeAddr, placeURL, placeWebsite) {
  outputString = '<p><a href="' + placeURL + '" target="_blank">' +
    placeAddr + '</a></p>';
  if (placeWebsite != "") {
    outputString += '<p><a href="' + placeWebsite + '" target="_blank">' +
    placeWebsite + '</a></p>';
  }
  return outputString;
}

function constructInfoWindowContent(firstHeading, bodyContent) {
  contentString =
    '<div id="content">' +
      // '<div id="siteNotice">' +
      // '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' +
        firstHeading +
      '</h1>' +
      '<div id="bodyContent">' +
        bodyContent +
      '</div>'+
    '</div>';
    return contentString;
}


// autocomplete stuff
function setupAutoComplete() {
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(36.784580, -121.397437),
    new google.maps.LatLng(38.784580, -123.397437)
  );
  var options = { bounds: defaultBounds };

  var input = document.getElementById('pac-input');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var autocomplete = new google.maps.places.Autocomplete(input,options);
}




function setMarker(latLng, infoWindowContent) {
  var infowindow = new google.maps.InfoWindow;
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
  });
  infowindow.setContent(infoWindowContent);
  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker)
  })
}





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

  // infowindow = new google.maps.InfoWindow({
  //   map: map
  // });

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

function initialize(startLocs, modes, endLocs) {
    for (var i=0; i < startLocs.length; i++){
      calcRoute(startLocs[i], modes[i], endLocs [i]);
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

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var path = result.routes[0].overview_path;
      var route = result.routes[0];



      $(path).each(function(index, item) {
          polyline.getPath().push(item);
          bounds.extend(item);
      });

      polyline.setMap(map);
      map.fitBounds(bounds);

      infowindow = new google.maps.InfoWindow({
        map: map
      });

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


// not using currently
function centerOfBounds(bounds) {
  var latCenter = ((bounds.northeast.lat + bounds.southwest.lat)/2);
  var lngCenter = ((bounds.northeast.lng + bounds.southwest.lng)/2);
  var center = {
    lat: latCenter,
    lng: lngCenter
  };
  return center;
};
function stringifyLocation(location) {
  var output = "";
  output += location.lat;
  output += ", ";
  output += location.lng;
  return output;
};


// adapted from https://developers.google.com/maps/documentation/javascript/examples/geocoding-place-id#try-it-yourself
// doesn't really work -- won't *actually return* the LatLng
function geocodePlaceId(geocoder, placeId) {
  // // var theLatLng = {lat: 0.0, lng: 0.0};
  // // var geocoder = new google.maps.Geocoder;
  // geocoder.geocode({'placeId': placeId}, function(results, status) {
  //   if (status === google.maps.GeocoderStatus.OK) {
  //     if (results[0]) {
  //       var theLoc = results[0].geometry.location;

  //       var theLat = theLoc.lat();
  //       var theLat = parseFloat(theLat);
  //       var theLng = theLoc.lng();
  //       var theLng = parseFloat(theLng);

  //       theLatLng = {lat: theLat, lng: theLng}
  //       // theLatLng.lat = theLat;
  //       // theLatLng.lng = theLng;
  //       // debugger;
  //       // debugger;
  //       // return theLatLng;

  //       // map.setZoom(11);
  //       // map.setCenter(results[0].geometry.location);
  //       // var marker = new google.maps.Marker({
  //       //   map: map,
  //       //   position: results[0].geometry.location
  //       // });
  //       // infowindow.setContent(results[0].formatted_address);
  //       // infowindow.open(map, marker);
  //       // debugger;
  //     } else {
  //       window.alert('No results found');
  //     }
  //   } else {
  //     window.alert('Geocoder failed due to: ' + status);
  //   }
  // });
  // debugger;
  // // return theLatLng;
  // return theLatLng;
}


// // the following (in conjunction w/ geocode route
// // in controller using ruby geocode gem)
// // *works* - but isn't necessary, now that I know about
// // getting place.geometry.location.lat() & .lng()
// // was in the initMap() function
// $.ajax({
//   method: "POST",
//   url: "/geocode/new",
//   data: {location: formatted_address},
//   dataType: "json"
// })
// .done(function(response) {
//   console.log(response);
//   debugger;
// })

