var map;
var myLatLng = {lat: 37.784580, lng: -122.397437};
var marker;


function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 10
  });

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

}
