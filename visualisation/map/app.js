document.addEventListener('DOMContentLoaded', function () {
	var bikeData = BIKEINFO;
	var bikeIcon = L.icon({
	    iconUrl: 'barclaysbikes.png',
	   // iconSize:     [111, 85], // size of the icon
	   // iconAnchor:   [111, 85], // point of the icon which will correspond to marker's locatio
	   // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	var docks = new L.LayerGroup();


	/* this marker isn't visible! Because the Google layer sits atop everything. See comments in https://gist.github.com/crofty/2197701.
	"leaflet-googlemap.js" is old and buggy, it doesn't even use the latest version of leaflet,and isn't compatibel wth markers, let's not use it.
	 I would suggest using this instead https://github.com/shramov/leaflet-plugins (which is offically linked to on the leaflet plugins page)
	 See his google examples https://github.com/shramov/leaflet-plugins/blob/master/examples/google.html*/
	 var arrayLength = bikeData.length;
	 for (var i = 0; i < arrayLength; i++) {
	 	var dock = bikeData[i];
	 	L.marker([dock["latitude"], dock["longitude"]], {icon: bikeIcon}).bindPopup(dock["name"]).addTo(docks);
	}

	var googleLayer = new L.Google('ROADMAP');

	    var baseMaps = {
	    	"London": googleLayer
	    };

	    var overlayMaps = {
	    	"TFL Cycle Docks": docks
	    };
	var map = new L.Map('map',
	{
		center: new L.LatLng(51.52916347,-0.109970527),
		zoom: 15,
		layers: [googleLayer, docks]
	});

	L.control.layers(baseMaps, overlayMaps).addTo(map);

  });