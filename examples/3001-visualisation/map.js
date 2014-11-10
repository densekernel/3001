$(function() 

{ $(".splashbg").backstretch("img/splashbg.png");
 
var locations = [
["loc1", 51.524232, -0.133982],
["loc2", 51.526688, -0.128059],
["loc3", 51.52263, -0.139389],
["loc4", 51.532562, -0.123768],
["loc5", 51.519853, -0.088406],
["loc6", 51.518784, -0.149002],
["loc7", 51.530426, -0.152264],
["loc8", 51.530319, -0.161018],
];

var map = new google.maps.Map(document.getElementById('mapwrap'), {
zoom: 13,
center: new google.maps.LatLng(51.527543,-0.1266),
mapTypeId: google.maps.MapTypeId.ROADMAP
});

var root_local = '';

var image = new google.maps.MarkerImage(
root_local + 'barclaysbikes.png',
new google.maps.Size(40,40),
new google.maps.Point(0,0),
new google.maps.Point(0,40)
);

// var shadow = new google.maps.MarkerImage(
// root_local + 'google-maps-marker-shadow.png',
// new google.maps.Size(78,68),
// new google.maps.Point(0,0),
// new google.maps.Point(20,68)
// );

// var shape = {
// coord: [,2,14,3,15,4,15,5,15,6,15,7,15,8,15,9,15,10,15,11,15,12,14,13,14,14,13,15,13,16,12,17,12,18,12,19,11,20,11,21,10,22,10,23,9,24,9,25,8,26,8,27,7,27,7,26,6,25,6,24,5,23,5,22,4,21,4,20,3,19,3,18,3,17,2,16,2,15,1,14,1,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,1,3,2,2,3,1,4,0,11,0],
// type: 'poly'
// };

for (i = 0; i < bikeInfo.length; i++) { 
	marker = new google.maps.Marker({
	position: new google.maps.LatLng(bikeInfo[i].latitude, bikeInfo[i].longitude),
	map: map,
	icon: image,
	// shadow: shadow,
	// shape: shape,
	});



	// google.maps.event.addListener(marker, 'click', (function(marker, i) {
	// return function() {
	// infowindow.setContent(locations[i][0]);
	// infowindow.open(map, marker);
	// }
	// })(marker, i));
} 
 
});